
from flask import request, jsonify
from config.firebase import db
from models.budget import BudgetModel
from datetime import datetime 

class BudgetController:
    def create_budget(self, user_id):
        try:
            budget_data = request.get_json()
            
            # Ensure userId is included in the budget data
            budget_data['userId'] = user_id
            
            # Add timestamp and month_year to the budget data
            budget_data['timestamp'] = datetime.utcnow().isoformat()
            budget_data['month_year'] = datetime.utcnow().strftime("%Y-%m")
            
            budget_model = BudgetModel(budget_data)
            budget_dict = budget_model.to_dict()

            # Store budget in a dedicated 'budgets' collection
            budget_ref = db.collection('budgets').document()
            budget_ref.set(budget_dict)

            return jsonify({
                "message": "Budget created successfully", 
                "budget_id": budget_ref.id
            }), 201

        except Exception as e:
            print(f"Error creating budget: {e}")
            return jsonify({"error": str(e)}), 500
        

    def get_budget(self, user_id):
        try:
            # Optional: Get month_year from query parameters
            month_year = request.args.get('month_year')  # Format: "2023-10"

            # Query the budgets collection with userId filter
            query = db.collection('budgets').where('userId', '==', user_id)
            
            if month_year:
                # Filter by month_year if provided
                query = query.where('month_year', '==', month_year)

            # Get the latest budget by timestamp (descending)
            budgets = query.order_by('timestamp', direction='DESCENDING').limit(1).get()

            if len(budgets) > 0:
                budget_data = budgets[0].to_dict()
                budget_data['id'] = budgets[0].id  # Include the document ID
                return jsonify(budget_data), 200
            else:
                return jsonify({"message": "No budget found"}), 404

        except Exception as e:
            print(f"Error getting budget: {e}")
            return jsonify({"error": str(e)}), 500

    def update_budget(self, user_id):
        try:
            budget_data = request.get_json()
            budget_id = budget_data.get('budget_id')
            
            # Ensure userId is included in the budget data
            budget_data['userId'] = user_id
            
            # Add timestamp and month_year
            budget_data['timestamp'] = datetime.utcnow().isoformat()
            budget_data['month_year'] = datetime.utcnow().strftime("%Y-%m")
            
            budget_model = BudgetModel(budget_data)
            budget_dict = budget_model.to_dict()

            if budget_id:
                # Update specific budget document if ID is provided
                budget_ref = db.collection('budgets').document(budget_id)
                budget_ref.update(budget_dict)
                return jsonify({"message": "Budget updated successfully"}), 200
            else:
                # Check if budget exists for this month
                month_year = budget_dict['month_year']
                existing_budgets = db.collection('budgets')\
                    .where('userId', '==', user_id)\
                    .where('month_year', '==', month_year)\
                    .limit(1).get()
                
                if len(existing_budgets) > 0:
                    # Update existing budget for this month
                    existing_id = existing_budgets[0].id
                    db.collection('budgets').document(existing_id).update(budget_dict)
                    return jsonify({
                        "message": "Budget updated successfully", 
                        "budget_id": existing_id
                    }), 200
                else:
                    # Create new budget if none exists for this month
                    new_budget = db.collection('budgets').document()
                    new_budget.set(budget_dict)
                    return jsonify({
                        "message": "Budget created successfully", 
                        "budget_id": new_budget.id
                    }), 201

        except Exception as e:
            print(f"Error updating budget: {e}")
            return jsonify({"error": str(e)}), 500