import os
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv
import bcrypt
import datetime

# Load environment variables from .env
load_dotenv()

# Read service account path
cred_path = os.getenv("FIREBASE_CREDENTIALS")

# ---------------------------------------------------------------------------
# In-memory mock data store (persists for the server session)
# ---------------------------------------------------------------------------
_MOCK_DB = {
    "users": {
        "demo_user": {
            "email": "sample@gmail.com",
            "username": "Demo User",
            "password": "$2b$12$esak.wjAAz3fnqBXSZs6ruMPDAxfLpL7wt5JbsMwTzvTyUFYIYdpS",  # 123456789
            "role": "User",
            "uid": "demo_user",
        }
    },
    "trading": {
        "demo_user": {
            "funds": 100000.0,
            "holdings": {"RELIANCE": 10, "TCS": 5},
            "transactions": [
                {
                    "type": "buy",
                    "stock_symbol": "RELIANCE",
                    "quantity": 10,
                    "price_per_share": 2500,
                    "timestamp": datetime.datetime.now().isoformat(),
                }
            ],
        }
    },
}


class MockDoc:
    """Simulates a Firestore DocumentSnapshot."""
    def __init__(self, data, doc_id):
        self._data = data
        self.id = doc_id
        self.exists = data is not None

    def to_dict(self):
        return dict(self._data) if self._data else {}


class MockDocumentRef:
    """Simulates a Firestore DocumentReference (read + write)."""
    def __init__(self, collection_name, doc_id):
        self._col = collection_name
        self._id = doc_id
        self.id = doc_id

    def _store(self):
        """Return the collection sub-dict, creating it if needed."""
        return _MOCK_DB.setdefault(self._col, {})

    def get(self):
        data = self._store().get(self._id)
        return MockDoc(data, self._id)

    def set(self, data, merge=False):
        store = self._store()
        if merge and self._id in store:
            store[self._id].update(data)
        else:
            store[self._id] = dict(data)

    def update(self, data):
        store = self._store()
        if self._id not in store:
            store[self._id] = {}
        store[self._id].update(data)

    def delete(self):
        self._store().pop(self._id, None)

    def collection(self, sub_name):
        """Support sub-collections (not fully implemented, returns empty)."""
        return MockCollection(f"{self._col}/{self._id}/{sub_name}")


class MockCollection:
    """Simulates a Firestore CollectionReference."""
    def __init__(self, name):
        self.name = name
        self._filters = []

    def document(self, doc_id="__auto__"):
        if doc_id == "__auto__":
            import uuid
            doc_id = str(uuid.uuid4())
        return MockDocumentRef(self.name, doc_id)

    def where(self, *args, **kwargs):
        self._filters.append((args, kwargs))
        return self

    def order_by(self, *args, **kwargs):
        return self

    def limit(self, *args, **kwargs):
        return self

    def get(self):
        all_docs = _MOCK_DB.get(self.name, {})
        return [MockDoc(data, doc_id) for doc_id, data in all_docs.items()]

    def stream(self):
        return iter(self.get())

    def add(self, data):
        import uuid
        new_id = str(uuid.uuid4())
        ref = MockDocumentRef(self.name, new_id)
        ref.set(data)
        return (None, ref)


class MockFirestore:
    def collection(self, name):
        return MockCollection(name)


# Always use mock for local development
db = MockFirestore()
print("Using MockFirestore (forced).")
