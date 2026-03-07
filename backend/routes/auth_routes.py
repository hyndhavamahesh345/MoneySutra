from flask import Blueprint, request, jsonify
from controllers.authcontroller import register_user, login_user
from models.user import User
auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.json
    response, status_code = register_user(data['email'], data['password'], data['username'],data['role'])
    return jsonify(response), status_code

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    response, status_code = login_user(data['email'], data['password'])
    return jsonify(response), status_code
