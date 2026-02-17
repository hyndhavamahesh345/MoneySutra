
from flask import request, jsonify, Blueprint
from controllers.budget_controller import BudgetController

# Create a Blueprint for budget routes
budget_bp = Blueprint('budget', __name__)
budget_controller = BudgetController()

@budget_bp.route('/budget/create', methods=['POST'])
def create_budget_route():
    print("Received request to create budget")  # Debugging
    data = request.get_json()
    print("Request data:", data)  # Debugging
    user_id = data.get('userId')
    if not user_id:
        return jsonify({"error": "User ID not found in request body"}), 400
    return budget_controller.create_budget(user_id)

@budget_bp.route('/budget/get', methods=['POST'])
def get_budget_route():
    data = request.get_json()
    user_id = data.get('userId')
    if not user_id:
        return jsonify({"error": "User ID not found in request body"}), 400
    return budget_controller.get_budget(user_id)

@budget_bp.route('/budget/update', methods=['PUT'])
def update_budget_route():
    data = request.get_json()
    user_id = data.get('userId')
    if not user_id:
        return jsonify({"error": "User ID not found in request body"}), 400
    return budget_controller.update_budget(user_id)