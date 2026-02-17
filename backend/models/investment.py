import datetime
from config.firebase import db

class Investment:
    def __init__(self, user_id, stock_name, quantity, buy_price):
        self.user_id = user_id
        self.stock_name = stock_name
        self.quantity = quantity
        self.buy_price = buy_price
        self.buy_date = datetime.datetime.now().isoformat()

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "stock_name": self.stock_name,
            "quantity": self.quantity,
            "buy_price": self.buy_price,
            "buy_date": self.buy_date
        }

    @staticmethod
    def user_exists(user_id):
        """Check if user exists in Firestore (users -> uid -> data)"""
        try:
            user_ref = db.collection("users").document(user_id).get()
            if user_ref.exists:
                print(f"✅ User {user_id} exists.")
                return True
            else:
                print(f"❌ User {user_id} does NOT exist.")
                return False
        except Exception as e:
            print(f"🔥 Error checking user {user_id}: {e}")
            return False

    @staticmethod
    def add_investment(user_id, stock_name, quantity, buy_price):
        """Add investment only if user exists in Firestore"""
        if not Investment.user_exists(user_id):
            return {"error": "User ID does not exist in Firestore"}, 404
        
        investment = Investment(user_id, stock_name, quantity, buy_price)
        try:
            db.collection("investments").add(investment.to_dict())
            return {"message": "Investment added successfully"}, 201
        except Exception as e:
            return {"error": str(e)}, 400
