from flask import Flask, jsonify, request
from config.firebase import db  # Import Firestore client
from datetime import datetime
from flask_cors import CORS
from google.cloud import firestore  # Added this import
import os
from routes.stock_routes import stock_routes
from routes.auth_routes import auth_routes
from routes.investment_routes import investment_bp
# from routes.transaction_routes import transaction_routes
from controllers.transaction_controller import transaction_blueprint
from routes.user_routes import user_routes
from routes.expense_route import expense_bp
from routes.saving_routes import savings_bp
from routes.budget_routes import budget_bp
from routes.advisor_routes import advisor_bp
from functools import wraps

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Authentication decorator
def require_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"error": "Authorization header required"}), 401
        
        user_id = auth_header.split('Bearer ')[1]
        if not user_id:
            return jsonify({"error": "User ID not found in token"}), 401
        
        # You can add additional verification here if needed
        
        # Add user_id to the request context
        request.user_id = user_id
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def home():
    return "Hello, this is moneymitra api!"

app.register_blueprint(auth_routes, url_prefix='/auth')
app.register_blueprint(investment_bp)
app.register_blueprint(transaction_blueprint)
app.register_blueprint(stock_routes)
app.register_blueprint(user_routes)
app.register_blueprint(budget_bp)
app.register_blueprint(expense_bp)
app.register_blueprint(savings_bp)
app.register_blueprint(advisor_bp)
# @app.route('/api/monthly-data', methods=['GET'])
# @require_auth
# def get_monthly_data():
#     try:
#         user_id = request.user_id  # Get user_id from the request context

#         # Query budgets collection
#         budgets_query = db.collection('budgets').where('userId', '==', user_id)
#         budgets_snapshot = budgets_query.get()

#         monthly_data = {}
#         for budget in budgets_snapshot:
#             budget_data = budget.to_dict()
#             month_year = budget_data.get('month_year')
#             month = datetime.strptime(month_year, "%Y-%m").strftime("%b")
#             income = budget_data.get('income', 0)
#             expenses = (
#                 budget_data.get('stocks', 0) +
#                 budget_data.get('bonds', 0) +
#                 budget_data.get('mutualFunds', 0) +
#                 budget_data.get('realEstate', 0) +
#                 budget_data.get('crypto', 0) +
#                 budget_data.get('fixedDeposits', 0) +
#                 budget_data.get('gold', 0) +
#                 budget_data.get('emi', 0)
#             )

#             if month_year in monthly_data:
#                 monthly_data[month_year]['income'] += income
#                 monthly_data[month_year]['expenses'] += expenses
#             else:
#                 monthly_data[month_year] = {
#                     'month': month,
#                     'income': income,
#                     'expenses': expenses,
#                 }

#         return jsonify(list(monthly_data.values())), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
@app.route('/monthly-data', methods=['GET'])
@require_auth
def get_monthly_data():
    try:
        user_id = request.user_id  # Get user_id from the request context

        # Query budgets collection for income
        budgets_query = db.collection('budgets').where('userId', '==', user_id)
        budgets_snapshot = budgets_query.get()

        # Query expenses collection for actual expenses
        expenses_query = db.collection('expenses').where('userId', '==', user_id)
        expenses_snapshot = expenses_query.get()

        # Initialize a dictionary to store monthly data
        monthly_data = {}

        # Process budgets data (only for income)
        for budget in budgets_snapshot:
            budget_data = budget.to_dict()
            month_year = budget_data.get('month_year')
            month = datetime.strptime(month_year, "%Y-%m").strftime("%b")
            income = budget_data.get('income', 0)

            if month_year in monthly_data:
                monthly_data[month_year]['income'] += income
            else:
                monthly_data[month_year] = {
                    'month': month,
                    'income': income,
                    'expenses': 0,  # Initialize expenses to 0
                }

        # Process expenses data (only for actual expenses)
        for expense in expenses_snapshot:
            expense_data = expense.to_dict()
            expense_date = datetime.fromisoformat(expense_data.get('timestamp'))
            month_year = expense_date.strftime("%Y-%m")

            if month_year not in monthly_data:
                monthly_data[month_year] = {
                    'month': expense_date.strftime("%b"),
                    'income': 0,  # Income is only from budgets
                    'expenses': 0,
                }

            monthly_data[month_year]['expenses'] += expense_data.get('amount', 0)

        # Convert the dictionary to a list
        result = list(monthly_data.values())

        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/budget-progress', methods=['GET'])
@require_auth
def get_budget_progress():
    try:
        user_id = request.user_id

        category_mapping = {
            "stocks": "Stocks",
            "bonds": "Bonds", 
            "mutualFunds": "Mutual Funds",
            "realEstate": "Real Estate",
            "crypto": "Crypto",
            "fixedDeposits": "Fixed Deposits",
            "gold": "Gold",
            "emi": "EMI",
            "savings": "Savings"
        }
        valid_categories = list(category_mapping.values()) + ["Other"]

        current_date = datetime.now()
        current_month_year = current_date.strftime("%Y-%m")
        current_month = current_date.month
        current_year = current_date.year

        budgets_query = db.collection('budgets').where('userId', '==', user_id).where('month_year', '==', current_month_year)
        budgets_snapshot = budgets_query.get()
        budgets_data = {}

        if budgets_snapshot:
            budget_dict = budgets_snapshot[0].to_dict() if budgets_snapshot[0] else {}

            for field, category in category_mapping.items():
                budgets_data[category] = budget_dict.get(field, 0) or 0  

        expenses_data = {}

        expenses_query = db.collection('expenses').where('userId', '==', user_id).where('month_year', '==', current_month_year)
        expenses_snapshot = expenses_query.get()

        if len(expenses_snapshot) == 0:
            expenses_query = db.collection('expenses').where('userId', '==', user_id)
            all_expenses = expenses_query.get()
            
            expenses_snapshot = []
            for expense in all_expenses:
                try:
                    expense_dict = expense.to_dict()
                    expense_date = None
                    
                    if 'date' in expense_dict:
                        try:
                            expense_date = datetime.strptime(expense_dict['date'], "%Y-%m-%d")
                        except ValueError:
                            pass
                    elif 'timestamp' in expense_dict:
                        try:
                            expense_date = datetime.fromisoformat(expense_dict['timestamp'].replace('Z', '+00:00'))
                        except ValueError:
                            pass
                    
                    if expense_date and expense_date.month == current_month and expense_date.year == current_year:
                        expenses_snapshot.append(expense)
                except Exception as e:
                    print(f"Skipping corrupted expense record: {e}")
                    continue  

        for expense in expenses_snapshot:
            try:
                expense_dict = expense.to_dict()
                category = expense_dict.get('category', 'Other')

                if category not in valid_categories:
                    category = next((valid_cat for valid_cat in valid_categories if valid_cat.lower() == category.lower()), 'Other')

                amount = expense_dict.get('amount', 0) or 0  

                expenses_data[category] = expenses_data.get(category, 0) + amount
            except Exception as e:
                print(f"Skipping invalid expense record: {e}")
                continue  

        budget_progress = []
        for category in valid_categories:
            allocated = budgets_data.get(category, 0)
            spent = expenses_data.get(category, 0)
            percentage = round((spent / allocated) * 100) if allocated > 0 else 0

            budget_progress.append({
                'category': category,
                'allocated': allocated,
                'spent': spent,
                'percentage': percentage,
            })

        return jsonify(budget_progress), 200

    except Exception as e:
        print(f"Error in get_budget_progress: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


@app.route('/recent-transactions', methods=['GET'])
@require_auth
def get_recent_transactions():
    try:
        user_id = request.user_id

        expenses_query = db.collection('expenses').where('userId', '==', user_id)
        expenses_snapshot = expenses_query.order_by('timestamp', direction='DESCENDING').limit(5).get()

        recent_transactions = []
        for expense in expenses_snapshot:
            try:
                expense_data = expense.to_dict()

                transaction = {
                    'id': expense.id,
                    'description': expense_data.get('description', 'No description'),
                    'category': expense_data.get('category', 'Other'),
                    'amount': expense_data.get('amount', 0) or 0,
                    'date': "N/A"
                }

                timestamp = expense_data.get('timestamp')
                if timestamp:
                    try:
                        transaction['date'] = datetime.fromisoformat(timestamp.replace('Z', '+00:00')).strftime("%b %d, %Y")
                    except ValueError:
                        pass  

                recent_transactions.append(transaction)

            except Exception as e:
                print(f"Skipping invalid expense record {expense.id}: {e}")
                continue  

        return jsonify(recent_transactions), 200

    except Exception as e:
        print(f"Error in get_recent_transactions: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Render provides PORT env variable
    app.run(host='0.0.0.0', port=port,debug=True)