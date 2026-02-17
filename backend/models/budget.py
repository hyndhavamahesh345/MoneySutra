
from datetime import datetime

class BudgetModel:
    def __init__(self, data):
        self.userId = data.get('userId')
        self.income = data.get('income', 0)
        self.stocks = data.get('stocks', 0)
        self.bonds = data.get('bonds', 0)
        self.mutualFunds = data.get('mutualFunds', 0)
        self.realEstate = data.get('realEstate', 0)
        self.crypto = data.get('crypto', 0)
        self.fixedDeposits = data.get('fixedDeposits', 0)
        self.gold = data.get('gold', 0)
        self.emi = data.get('emi', 0)
        self.savings = data.get('savings', 0)
        
        # Add timestamp and month_year
        self.timestamp = data.get('timestamp', datetime.utcnow().isoformat())
        self.month_year = data.get('month_year', datetime.utcnow().strftime("%Y-%m"))

    def to_dict(self):
        return {
            'userId': self.userId,
            'income': self.income,
            'stocks': self.stocks,
            'bonds': self.bonds,
            'mutualFunds': self.mutualFunds,
            'realEstate': self.realEstate,
            'crypto': self.crypto,
            'fixedDeposits': self.fixedDeposits,
            'gold': self.gold,
            'emi': self.emi,
            'savings': self.savings,
            'timestamp': self.timestamp,
            'month_year': self.month_year
        }