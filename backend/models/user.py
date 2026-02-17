import bcrypt
import uuid
from config.firebase import db
from datetime import datetime
import yfinance as yf

class User:
    def __init__(self, uid, email, username, role="User"):
        self.uid = uid
        self.email = email
        self.username = username
        self.role = role  # Default role is "User"

    @staticmethod
    def hash_password(password):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed_password.decode('utf-8')

    @staticmethod
    def check_password(password, hashed_password):
        return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

    @staticmethod
    def create_user(email, password, username, role):
        try:
            # Validate inputs
            if not email or not isinstance(email, str):
                return {"error": "Email is required and must be a string"}, 400
            if not password or not isinstance(password, str):
                return {"error": "Password is required and must be a string"}, 400
            if not username or not isinstance(username, str):
                return {"error": "Username is required and must be a string"}, 400
            if not role or not isinstance(role, str):
                role="User"
            # Ensure role is valid
            valid_roles = ["User", "Admin", "Advisor"]
            if role not in valid_roles:
                return {"error": "Invalid role. Must be 'User', 'Admin', or 'Advisor'"}, 400

            # Check if user already exists
            user_ref = db.collection("users").where("email", "==", email).stream()
            if any(user_ref):
                return {"error": "User already exists"}, 400

            # Create new user
            uid = str(uuid.uuid4())
            hashed_password = User.hash_password(password)

            # Create user document in the users collection
            user_data = {
                "uid": uid,
                "email": email,
                "username": username,
                "password": hashed_password,
                "role": role  # Store role in Firebase
            }
            
            db.collection("users").document(uid).set(user_data)

            # Initialize user document in the trading collection
            trading_data = {
                "funds": 10000.0,  # Initialize funds in the trading collection
                "holdings": {},
                "transactions": []
            }
            db.collection("trading").document(uid).set(trading_data)

            return {"message": "User registered successfully!", "uid": uid, "role": role}, 201
        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def authenticate_user(email, password):
        
        try:
            # Validate inputs
            if not email or not isinstance(email, str):
                return {"error": "Email is required and must be a string"}, 400
            if not password or not isinstance(password, str):
                return {"error": "Password is required and must be a string"}, 400
            # Fetch user data
            user_ref = db.collection("users").where("email", "==", email).stream()
            user_doc = next(user_ref, None)

            if user_doc:
                user_data = user_doc.to_dict()
                stored_password = user_data.get("password", "")
                stored_role = user_data.get("role", "User")  # Default to "User" if missing

                if User.check_password(password, stored_password):
                    # Return only login-related data
                    login_data = {
                        "uid": user_data.get("uid"),
                        "email": user_data.get("email"),
                        "username": user_data.get("username"),
                        "role": stored_role  # Return role in response
                    }
                    return {"message": "Login successful", "user": login_data}, 200
                else:
                    return {"error": "Invalid email or password"}, 401

            return {"error": "User not found"}, 404
        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def get_funds(uid):
        try:
            # Validate UID
            if not uid or not isinstance(uid, str):
                return {"error": "UID is required and must be a string"}, 400

            # Fetch user data from the trading collection
            trading_ref = db.collection("trading").document(uid).get()
            if trading_ref.exists:
                trading_data = trading_ref.to_dict()
                return {"funds": float(trading_data.get("funds", 0.0))}, 200
            return {"error": "User not found in trading collection"}, 404
        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def add_funds(uid, amount):
        try:
            # Validate inputs
            if not uid or not isinstance(uid, str):
                return {"error": "UID is required and must be a string"}, 400
            if not amount or not isinstance(amount, (str, int, float)):
                return {"error": "Amount is required and must be a number"}, 400

            # Convert amount to float
            amount = float(amount)

            # Validate that amount is positive
            if amount <= 0:
                return {"error": "Amount must be a positive number"}, 400

            # Fetch user data from the trading collection
            trading_ref = db.collection("trading").document(uid)
            trading_data = trading_ref.get().to_dict()

            if not trading_data:
                return {"error": "User not found in trading collection"}, 404

            # Ensure current_funds is a float
            current_funds = float(trading_data.get("funds", 0.0))

            # Calculate new funds
            new_funds = current_funds + amount

            # Update user's funds in the trading collection
            trading_ref.update({"funds": new_funds})

            return {"message": "Funds added successfully!", "new_funds": new_funds}, 200
        except ValueError as e:
            return {"error": f"Invalid amount: {amount}"}, 400
        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def buy_stock(uid, stock_symbol, quantity, price_per_share):
        try:
            # Validate inputs
            if not uid or not isinstance(uid, str):
                return {"error": "UID is required and must be a string"}, 400
            if not stock_symbol or not isinstance(stock_symbol, str):
                return {"error": "Stock symbol is required and must be a string"}, 400
            if not quantity or not isinstance(quantity, (str, int, float)):
                return {"error": "Quantity is required and must be a number"}, 400
            if not price_per_share or not isinstance(price_per_share, (str, int, float)):
                return {"error": "Price per share is required and must be a number"}, 400

            # Convert quantity and price_per_share to float
            quantity = float(quantity)
            price_per_share = float(price_per_share)

            # Validate that quantity and price_per_share are positive
            if quantity <= 0 or price_per_share <= 0:
                return {"error": "Quantity and price per share must be positive numbers"}, 400

            # Fetch user data from the trading collection
            trading_ref = db.collection("trading").document(uid)
            trading_data = trading_ref.get().to_dict()

            # If user data doesn't exist, return an error
            if not trading_data:
                return {"error": "User not found in trading collection"}, 404

            # Calculate total cost
            total_cost = quantity * price_per_share

            # Check if user has sufficient funds
            if trading_data.get("funds", 0.0) < total_cost:
                return {"error": "Insufficient funds"}, 400

            # Update holdings
            holdings = trading_data.get("holdings", {})
            if stock_symbol in holdings:
                holdings[stock_symbol] += quantity
            else:
                holdings[stock_symbol] = quantity

            # Update funds and transactions
            new_funds = trading_data.get("funds", 0.0) - total_cost
            transaction = {
                "type": "buy",
                "stock_symbol": stock_symbol,
                "quantity": quantity,
                "price_per_share": price_per_share,
                "total_cost": total_cost,
                "timestamp": datetime.now().isoformat()
            }

            # Update the user document in the trading collection
            trading_ref.set({
                "funds": new_funds,
                "holdings": holdings,
                "transactions": trading_data.get("transactions", []) + [transaction]
            }, merge=True)

            return {"message": "Stock purchased successfully!", "new_funds": new_funds}, 200
        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def sell_stock(uid, stock_symbol, quantity, price_per_share):
        try:
            # Validate inputs
            if not uid or not isinstance(uid, str):
                return {"error": "UID is required and must be a string"}, 400
            if not stock_symbol or not isinstance(stock_symbol, str):
                return {"error": "Stock symbol is required and must be a string"}, 400
            if not quantity or not isinstance(quantity, (str, int, float)):
                return {"error": "Quantity is required and must be a number"}, 400
            if not price_per_share or not isinstance(price_per_share, (str, int, float)):
                return {"error": "Price per share is required and must be a number"}, 400

            # Convert quantity and price_per_share to float
            quantity = float(quantity)
            price_per_share = float(price_per_share)

            # Validate that quantity and price_per_share are positive
            if quantity <= 0 or price_per_share <= 0:
                return {"error": "Quantity and price per share must be positive numbers"}, 400

            # Fetch user data from the trading collection
            trading_ref = db.collection("trading").document(uid)
            trading_data = trading_ref.get().to_dict()

            # If user data doesn't exist, return an error
            if not trading_data:
                return {"error": "User not found in trading collection"}, 404

            holdings = trading_data.get("holdings", {})

            # Check if user has enough shares to sell
            if stock_symbol not in holdings or holdings[stock_symbol] < quantity:
                return {"error": "Not enough shares to sell"}, 400

            # Calculate total earnings
            total_earnings = quantity * price_per_share

            # Update holdings
            holdings[stock_symbol] -= quantity
            if holdings[stock_symbol] == 0:
                del holdings[stock_symbol]

            # Update funds and transactions
            new_funds = trading_data.get("funds", 0.0) + total_earnings
            transaction = {
                "type": "sell",
                "stock_symbol": stock_symbol,
                "quantity": quantity,
                "price_per_share": price_per_share,
                "total_earnings": total_earnings,
                "timestamp": datetime.now().isoformat()
            }

            # Update the user document in the trading collection
            trading_ref.set({
                "funds": new_funds,
                "holdings": holdings,
                "transactions": trading_data.get("transactions", []) + [transaction]
            }, merge=True)

            return {"message": "Stock sold successfully!", "new_funds": new_funds}, 200
        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def get_holdings(uid):
        try:
            # Validate UID
            if not uid or not isinstance(uid, str):
                return {"error": "UID is required and must be a string"}, 400

            # Fetch user data from the trading collection
            trading_ref = db.collection("trading").document(uid).get()
            if trading_ref.exists:
                trading_data = trading_ref.to_dict()
                return {"holdings": trading_data.get("holdings", {})}, 200
            return {"error": "User not found in trading collection"}, 404
        except Exception as e:
            return {"error": str(e)}, 400

    @staticmethod
    def get_transactions(uid):
        try:
            # Validate UID
            if not uid or not isinstance(uid, str):
                return {"error": "UID is required and must be a string"}, 400

            # Fetch user data from the trading collection
            trading_ref = db.collection("trading").document(uid).get()
            if trading_ref.exists:
                trading_data = trading_ref.to_dict()
                return {"transactions": trading_data.get("transactions", [])}, 200
            return {"error": "User not found in trading collection"}, 404
        except Exception as e:
            return {"error": str(e)}, 400