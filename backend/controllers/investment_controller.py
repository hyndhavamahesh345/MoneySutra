from config.firebase import db
from models.investment import Investment

def add_investment(data):
    try:
        user_id = data.get("user_id")
        stock_name = data.get("stock_name")
        quantity = data.get("quantity")
        buy_price = data.get("buy_price")

        if not all([user_id, stock_name, quantity, buy_price]):
            return {"error": "Missing fields"}, 400

        user_doc = db.collection("users").document(user_id).get()
        if not user_doc.exists:
            return {"error": "User does not exist"}, 404

        investment = Investment(user_id, stock_name, quantity, buy_price)
        db.collection("investments").add(investment.to_dict())

        return {"message": "Investment added successfully!", "data": investment.to_dict()}, 201

    except Exception as e:
        return {"error": str(e)}, 500

def get_investments(user_id):
    try:
        user_doc = db.collection("users").document(user_id).get()
        if not user_doc.exists:
            return {"error": "User does not exist"}, 404

        investments = db.collection("investments").where("user_id", "==", user_id).stream()
        investment_list = [inv.to_dict() for inv in investments]

        return {"investments": investment_list}, 200

    except Exception as e:
        return {"error": str(e)}, 500
