import firebase_admin
from firebase_admin import credentials, firestore
from config.firebase import db

class Transaction:
    COLLECTION_NAME = "transactions"

    @staticmethod
    def calculate_wallet_balance(user_id):
        """
        Calculate the wallet balance by summing up all income and subtracting all expenses.
        """
        transactions = db.collection(Transaction.COLLECTION_NAME).document(user_id).collection("all_transactions").stream()
        wallet_balance = 0
        for t in transactions:
            transaction_data = t.to_dict()
            if 'amount' in transaction_data and 'type' in transaction_data:
                if transaction_data['type'] == 'income':
                    wallet_balance += transaction_data['amount']
                elif transaction_data['type'] == 'expense':
                    wallet_balance -= transaction_data['amount']
        return wallet_balance

    @staticmethod
    def update_user_wallet(user_id):
        """
        Update the user's wallet balance in the users/{uid} document.
        """
        wallet_balance = Transaction.calculate_wallet_balance(user_id)
        user_ref = db.collection("users").document(user_id)
        
        # Ensure the user document exists
        if not user_ref.get().exists:
            user_ref.set({"wallet": wallet_balance})  # Create the document with the wallet field
        else:
            user_ref.update({"wallet": wallet_balance})  # Update the wallet field

    @staticmethod
    def add_transaction(user_id, data):
        """
        Add a new transaction and update the user's wallet balance.
        """
        # Ensure the transaction has a 'type' field (income or expense)
        if 'type' not in data or data['type'] not in ['income', 'expense']:
            raise ValueError("Transaction type must be 'income' or 'expense'")

        # Reference to user's transactions
        user_transactions_ref = db.collection(Transaction.COLLECTION_NAME).document(user_id).collection("all_transactions")

        # Add transaction
        transaction_ref = user_transactions_ref.add(data)
        Transaction.update_user_wallet(user_id)  # Update wallet balance
        return {"message": "Transaction added", "transaction_id": transaction_ref[1].id}

    @staticmethod
    def get_all_transactions(user_id):
        """
        Retrieve all transactions for a user.
        """
        transactions = db.collection(Transaction.COLLECTION_NAME).document(user_id).collection("all_transactions").stream()
        return [{"id": t.id, **t.to_dict()} for t in transactions]
    
    @staticmethod
    def get_transaction_by_id(user_id, transaction_id):
        """
        Retrieve a specific transaction by its ID.
        """
        transaction_ref = db.collection(Transaction.COLLECTION_NAME).document(user_id).collection("all_transactions").document(transaction_id).get()
        if transaction_ref.exists:
            return transaction_ref.to_dict()
        return None

    @staticmethod
    def update_transaction(user_id, transaction_id, data):
        """
        Update an existing transaction and update the user's wallet balance.
        """
        transaction_ref = db.collection(Transaction.COLLECTION_NAME).document(user_id).collection("all_transactions").document(transaction_id)
        if transaction_ref.get().exists:
            transaction_ref.update(data)
            Transaction.update_user_wallet(user_id)  # Update wallet balance
            return {"message": "Transaction updated"}
        return None

    @staticmethod
    def delete_transaction(user_id, transaction_id):
        """
        Delete a transaction and update the user's wallet balance.
        """
        transaction_ref = db.collection(Transaction.COLLECTION_NAME).document(user_id).collection("all_transactions").document(transaction_id)
        if transaction_ref.get().exists:
            transaction_ref.delete()
            Transaction.update_user_wallet(user_id)  # Update wallet balance
            return {"message": "Transaction deleted"}
        return None

    @staticmethod
    def get_wallet_balance(user_id):
        """
        Retrieve the wallet balance for a user.
        """
        user_ref = db.collection("users").document(user_id).get()
        if user_ref.exists:
            return user_ref.to_dict().get("wallet", 0)
        return None