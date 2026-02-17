from flask import Blueprint, request, jsonify
from controllers.investment_controller import add_investment, get_investments

investment_bp = Blueprint("investment_bp", __name__)

@investment_bp.route("/investment/add", methods=["POST"])
def add_investment_route():
    data = request.json
    response, status = add_investment(data)
    return jsonify(response), status

@investment_bp.route("/investment/get/<string:user_id>", methods=["GET"])
def get_investments_route(user_id):
    response, status = get_investments(user_id)
    return jsonify(response), status
