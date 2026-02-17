import os
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Read service account path
cred_path = os.getenv("FIREBASE_CREDENTIALS")

if not cred_path:
    raise RuntimeError("FIREBASE_CREDENTIALS not set in .env")

if not os.path.exists(cred_path):
    raise RuntimeError(f"Firebase credentials file not found: {cred_path}")

# Initialize Firebase only once
if not firebase_admin._apps:
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)

# Firestore client (USED BY app.py)
db = firestore.client()
