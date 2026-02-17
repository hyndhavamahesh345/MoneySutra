from config.firebase import db
from google.cloud.firestore import ArrayUnion

class SavingsModel:
    @staticmethod
    def add_bond(uid, bond_data):
        """
        Add a bond to the user's bonds array field.
        """
        user_ref = db.collection("users").document(uid)

        # Use arrayUnion to append the new bond to the existing array
        user_ref.update({"bonds": ArrayUnion([bond_data])})

    @staticmethod
    def get_bonds(uid):
        """
        Fetch the bonds array field from the user's document.
        """
        user_ref = db.collection("users").document(uid)
        user_data = user_ref.get()
        return user_data.to_dict().get("bonds", [])

    @staticmethod
    def add_mf(uid, mf_data):
        """
        Add a mutual fund to the user's mfs array field.
        """
        user_ref = db.collection("users").document(uid)

        # Use arrayUnion to append the new MF to the existing array
        user_ref.update({"mfs": ArrayUnion([mf_data])})

    @staticmethod
    def get_mfs(uid):
        """
        Fetch the mutual funds array field from the user's document.
        """
        user_ref = db.collection("users").document(uid)
        user_data = user_ref.get()
        return user_data.to_dict().get("mfs", [])

    @staticmethod
    def add_sip(uid, sip_data):
        """
        Add a SIP to the user's sips array field.
        """
        user_ref = db.collection("users").document(uid)

        # Use arrayUnion to append the new SIP to the existing array
        user_ref.update({"sips": ArrayUnion([sip_data])})

    @staticmethod
    def get_sips(uid):
        """
        Fetch the SIPs array field from the user's document.
        """
        user_ref = db.collection("users").document(uid)
        user_data = user_ref.get()
        return user_data.to_dict().get("sips", [])