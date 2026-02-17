from flask import request, jsonify
from config.firebase import db
from models.Expense import ExpenseModel
from datetime import datetime

class ExpenseController:
    def add_expense(self, user_id):
        try:
            expense_data = request.get_json()
            
            # Ensure userId is included in the expense data
            expense_data['userId'] = user_id
            
            # Add timestamp to the expense data
            expense_data['timestamp'] = datetime.utcnow().isoformat()
            
            expense_model = ExpenseModel(expense_data)
            expense_dict = expense_model.to_dict()

            # Store expense in a dedicated 'expenses' collection
            expense_ref = db.collection('expenses').document()
            expense_ref.set(expense_dict)

            return jsonify({
                "message": "Expense added successfully", 
                "expense_id": expense_ref.id
            }), 201

        except Exception as e:
            print(f"Error adding expense: {e}")
            return jsonify({"error": str(e)}), 500

    def get_expenses(self, user_id):
        try:
            # Query the expenses collection with userId filter
            query = db.collection('expenses').where('userId', '==', user_id)
            expenses = query.order_by('timestamp', direction='DESCENDING').get()

            expenses_data = []
            for expense in expenses:
                expense_dict = expense.to_dict()
                expense_dict['id'] = expense.id  # Include the document ID
                expenses_data.append(expense_dict)

            return jsonify(expenses_data), 200

        except Exception as e:
            print(f"Error fetching expenses: {e}")
            return jsonify({"error": str(e)}), 500