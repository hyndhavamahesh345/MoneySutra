from flask import Blueprint, request
from controllers.authcontroller import register_user, login_user
from models.user import User
user_routes = Blueprint('user_routes', __name__)
from flask import jsonify

@user_routes.route('/funds', methods=['GET'])
def get_funds():
    uid = request.args.get('uid')
    response, status_code = User.get_funds(uid)
    return jsonify(response), status_code

@user_routes.route('/add_funds', methods=['POST'])
def add_funds():
    data = request.get_json()
    uid = data.get('uid')
    amount = data.get('amount')
    response, status_code = User.add_funds(uid, amount)
    return jsonify(response), status_code

@user_routes.route('/buy_stock', methods=['POST'])
def buy_stock():
    data = request.get_json()
    uid = data.get('uid')
    stock_symbol = data.get('stock_symbol')
    quantity = data.get('quantity')
    price_per_share = data.get('price_per_share')
    response, status_code = User.buy_stock(uid, stock_symbol, quantity, price_per_share)
    return jsonify(response), status_code

@user_routes.route('/sell_stock', methods=['POST'])
def sell_stock():
    data = request.get_json()
    uid = data.get('uid')
    stock_symbol = data.get('stock_symbol')
    quantity = data.get('quantity')
    price_per_share = data.get('price_per_share')
    response, status_code = User.sell_stock(uid, stock_symbol, quantity, price_per_share)
    return jsonify(response), status_code

@user_routes.route('/holdings', methods=['GET'])
def get_holdings():
    uid = request.args.get('uid')
    response, status_code = User.get_holdings(uid)
    return jsonify(response), status_code

@user_routes.route('/transactions', methods=['GET'])
def get_transactions():
    uid = request.args.get('uid')
    response, status_code = User.get_transactions(uid)
    return jsonify(response), status_code

