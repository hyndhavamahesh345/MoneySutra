from flask import Blueprint
from controllers.savings_controller import SavingsController

savings_bp = Blueprint("savings", __name__)

# Bonds Routes
@savings_bp.route("/savings/addbonds/<uid>", methods=["POST"])
def add_bond(uid):
    """
    Add a bond to the user's bonds subcollection.
    """
    return SavingsController.add_bond(uid)

@savings_bp.route("/savings/getbonds/<uid>", methods=["GET"])
def get_bonds(uid):
    """
    Fetch all bonds for a user.
    """
    return SavingsController.get_bonds(uid)

# Mutual Funds Routes
@savings_bp.route("/savings/addmf/<uid>", methods=["POST"])
def add_mf(uid):
    """
    Add a mutual fund to the user's mfs subcollection.
    """
    return SavingsController.add_mf(uid)

@savings_bp.route("/savings/getmf/<uid>", methods=["GET"])
def get_mfs(uid):
    """
    Fetch all mutual funds for a user.
    """
    return SavingsController.get_mfs(uid)

# SIPs Routes
@savings_bp.route("/savings/addsip/<uid>", methods=["POST"])
def add_sip(uid):
    """
    Add a SIP to the user's sips subcollection.
    """
    return SavingsController.add_sip(uid)

@savings_bp.route("/savings/getsip/<uid>", methods=["GET"])
def get_sips(uid):
    """
    Fetch all SIPs for a user.
    """
    return SavingsController.get_sips(uid)