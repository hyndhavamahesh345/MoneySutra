from datetime import datetime

class ExpenseModel:
    def __init__(self, data):
        self.userId = data.get('userId')
        self.description = data.get('description', '')
        self.amount = data.get('amount', 0)
        self.category = data.get('category', 'Other')
        self.date = data.get('date', datetime.utcnow().isoformat())
        self.timestamp = data.get('timestamp', datetime.utcnow().isoformat())

    def to_dict(self):
        return {
            'userId': self.userId,
            'description': self.description,
            'amount': self.amount,
            'category': self.category,
            'date': self.date,
            'timestamp': self.timestamp,
        }