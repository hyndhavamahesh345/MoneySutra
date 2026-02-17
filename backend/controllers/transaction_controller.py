from flask import Blueprint, request, jsonify
from models.transaction import Transaction

# Define the blueprint
transaction_blueprint = Blueprint("transaction_blueprint", __name__)

@transaction_blueprint.route("/transactions/<user_id>", methods=["POST"])
def add_transaction(user_id):
    """
    Add a new transaction for a user.
    """
    data = request.get_json()
    if not data or 'amount' not in data or 'type' not in data:
        return jsonify({"error": "Missing required fields: 'amount' and 'type'"}), 400

    try:
        result = Transaction.add_transaction(user_id, data)
        return jsonify(result), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@transaction_blueprint.route("/transactions/<user_id>", methods=["GET"])
def get_transactions(user_id):
    """
    Retrieve all transactions for a user.
    """
    transactions = Transaction.get_all_transactions(user_id)
    return jsonify(transactions), 200

@transaction_blueprint.route("/transactions/<user_id>/<transaction_id>", methods=["GET"])
def get_transaction(user_id, transaction_id):
    """
    Retrieve a specific transaction by its ID.
    """
    transaction = Transaction.get_transaction_by_id(user_id, transaction_id)
    if transaction:
        return jsonify(transaction), 200
    return jsonify({"error": "Transaction not found"}), 404

@transaction_blueprint.route("/transactions/<user_id>/<transaction_id>", methods=["PUT"])
def update_transaction(user_id, transaction_id):
    """
    Update an existing transaction.
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    result = Transaction.update_transaction(user_id, transaction_id, data)
    if result:
        return jsonify(result), 200
    return jsonify({"error": "Transaction not found"}), 404

@transaction_blueprint.route("/transactions/<user_id>/<transaction_id>", methods=["DELETE"])
def delete_transaction(user_id, transaction_id):
    """
    Delete a transaction.
    """
    result = Transaction.delete_transaction(user_id, transaction_id)
    if result:
        return jsonify(result), 200
    return jsonify({"error": "Transaction not found"}), 404

@transaction_blueprint.route("/transactions/<user_id>/wallet", methods=["GET"])
def get_wallet_balance(user_id):
    """
    Retrieve the wallet balance for a user.
    """
    wallet_balance = Transaction.get_wallet_balance(user_id)
    if wallet_balance is not None:
        return jsonify({"wallet_balance": wallet_balance}), 200
    return jsonify({"error": "User not found"}), 404