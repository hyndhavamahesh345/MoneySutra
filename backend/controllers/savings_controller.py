from flask import request, jsonify
from models.savings import SavingsModel

class SavingsController:
    @staticmethod
    def add_bond(uid):
        """
        Add a bond to the user's bonds subcollection.
        """
        bond_data = request.json
        if not bond_data:
            return jsonify({"error": "No data provided"}), 400

        # Validate required fields
        required_fields = ["amount", "interestRate", "maturityDate", "bondName", "bondType", "couponFrequency", "purchaseDate", "yieldToMaturity", "creditRating", "taxStatus"]
        for field in required_fields:
            if field not in bond_data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        SavingsModel.add_bond(uid, bond_data)
        return jsonify({"message": "Bond added successfully"}), 201

    @staticmethod
    def get_bonds(uid):
        """
        Fetch all bonds for a user.
        """
        bonds = SavingsModel.get_bonds(uid)
        return jsonify(bonds), 200

    @staticmethod
    def add_mf(uid):
        """
        Add a mutual fund to the user's mfs subcollection.
        """
        mf_data = request.json
        if not mf_data:
            return jsonify({"error": "No data provided"}), 400

        # Validate required fields
        required_fields = ["amount", "fundName", "investmentDate", "fundType", "nav", "unitsPurchased", "expenseRatio"]
        for field in required_fields:
            if field not in mf_data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        SavingsModel.add_mf(uid, mf_data)
        return jsonify({"message": "Mutual Fund added successfully"}), 201

    @staticmethod
    def get_mfs(uid):
        """
        Fetch all mutual funds for a user.
        """
        mfs = SavingsModel.get_mfs(uid)
        return jsonify(mfs), 200

    @staticmethod
    def add_sip(uid):
        """
        Add a SIP to the user's sips subcollection.
        """
        sip_data = request.json
        if not sip_data:
            return jsonify({"error": "No data provided"}), 400

        # Validate required fields
        required_fields = ["amount", "frequency", "startDate", "duration"]
        for field in required_fields:
            if field not in sip_data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        SavingsModel.add_sip(uid, sip_data)
        return jsonify({"message": "SIP added successfully"}), 201

    @staticmethod
    def get_sips(uid):
        """
        Fetch all SIPs for a user.
        """
        sips = SavingsModel.get_sips(uid)
        return jsonify(sips), 200