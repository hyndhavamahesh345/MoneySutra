from flask import Blueprint,request,jsonify
from controllers.expense_controller import ExpenseController

# Create a Blueprint for expense routes
expense_bp = Blueprint('expense', __name__)
expense_controller = ExpenseController()

@expense_bp.route('/expense/add', methods=['POST'])
def add_expense_route():
    data = request.get_json()
    user_id = data.get('userId')
    if not user_id:
        return jsonify({"error": "User ID not found in request body"}), 400
    return expense_controller.add_expense(user_id)

@expense_bp.route('/expense/get', methods=['POST'])
def get_expenses_route():
    data = request.get_json()
    user_id = data.get('userId')
    if not user_id:
        return jsonify({"error": "User ID not found in request body"}), 400
    return expense_controller.get_expenses(user_id)