from flask import Blueprint, request, jsonify
from firebase_admin import firestore
import logging
from config.firebase import db
# Create Blueprint for advisor routes
advisor_bp = Blueprint('advisor_routes', __name__)


# Helper function to validate input data
def validate_input(data, required_fields):
    for field in required_fields:
        if field not in data:
            return False, f"Missing required field: {field}"
    return True, ""

# Fetch list of advisors
@advisor_bp.route('/advisors', methods=['GET'])
def get_advisors():
    try:
        advisors = []
        users_ref = db.collection('users')
        users = users_ref.stream()

        for user in users:
            user_data = user.to_dict()
            if user_data.get('role') == 'Advisor':
                advisors.append({
                    'uid': user.id,
                    'name': user_data.get('username', 'No Name'),
                    'specialization': user_data.get('specialization', 'Not Specified'),
                    'bio': user_data.get('bio', 'No Bio')
                })

        return jsonify({"success": True, "advisors": advisors}), 200
    except Exception as e:
        logging.error(f"Error fetching advisors: {e}")
        return jsonify({"success": False, "message": "Failed to fetch advisors"}), 500

# Send a message to an advisor
@advisor_bp.route('/send_message', methods=['POST'])
def send_message():
    try:
        data = request.get_json()
        is_valid, error_message = validate_input(data, ['sender_uid', 'advisor_uid', 'message'])
        if not is_valid:
            return jsonify({"success": False, "message": error_message}), 400

        # Store the message in the advisor's subcollection
        advisor_ref = db.collection('advisors').document(data['advisor_uid'])
        messages_ref = advisor_ref.collection('messages')
        messages_ref.add({
            'sender_uid': data['sender_uid'],
            'message': data['message'],
            'timestamp': firestore.SERVER_TIMESTAMP
        })

        return jsonify({"success": True, "message": "Message sent successfully"}), 200
    except Exception as e:
        logging.error(f"Error sending message: {e}")
        return jsonify({"success": False, "message": "Failed to send message"}), 500

# Request a consultation with an advisor
@advisor_bp.route('/request_consultation', methods=['POST'])
def request_consultation():
    try:
        data = request.get_json()
        is_valid, error_message = validate_input(data, ['sender_uid', 'advisor_uid'])
        if not is_valid:
            return jsonify({"success": False, "message": error_message}), 400

        # Store the consultation request in the advisor's subcollection
        advisor_ref = db.collection('advisors').document(data['advisor_uid'])
        consultations_ref = advisor_ref.collection('consultations')
        consultations_ref.add({
            'sender_uid': data['sender_uid'],
            'status': 'pending',
            'timestamp': firestore.SERVER_TIMESTAMP
        })

        return jsonify({"success": True, "message": "Consultation requested successfully"}), 200
    except Exception as e:
        logging.error(f"Error requesting consultation: {e}")
        return jsonify({"success": False, "message": "Failed to request consultation"}), 500

# Set an appointment with an advisor
@advisor_bp.route('/set_appointment', methods=['POST'])
def set_appointment():
    try:
        data = request.get_json()
        is_valid, error_message = validate_input(data, ['sender_uid', 'advisor_uid', 'date', 'time'])
        if not is_valid:
            return jsonify({"success": False, "message": error_message}), 400

        # Store the appointment in the advisor's subcollection
        advisor_ref = db.collection('advisors').document(data['advisor_uid'])
        appointments_ref = advisor_ref.collection('appointments')
        appointments_ref.add({
            'sender_uid': data['sender_uid'],
            'date': data['date'],
            'time': data['time'],
            'status': 'pending',
            'timestamp': firestore.SERVER_TIMESTAMP
        })

        return jsonify({"success": True, "message": "Appointment set successfully"}), 200
    except Exception as e:
        logging.error(f"Error setting appointment: {e}")
        return jsonify({"success": False, "message": "Failed to set appointment"}), 500

# Fetch messages for an advisor
@advisor_bp.route('/get_messages/<advisor_uid>', methods=['GET'])
def get_messages(advisor_uid):
    try:
        messages = []
        advisor_ref = db.collection('advisors').document(advisor_uid)
        messages_ref = advisor_ref.collection('messages').stream()

        for message in messages_ref:
            messages.append(message.to_dict())

        return jsonify({"success": True, "messages": messages}), 200
    except Exception as e:
        logging.error(f"Error fetching messages: {e}")
        return jsonify({"success": False, "message": "Failed to fetch messages"}), 500

# Fetch consultation requests for an advisor
@advisor_bp.route('/get_consultations/<advisor_uid>', methods=['GET'])
def get_consultations(advisor_uid):
    try:
        consultations = []
        advisor_ref = db.collection('advisors').document(advisor_uid)
        consultations_ref = advisor_ref.collection('consultations').stream()

        for consultation in consultations_ref:
            consultations.append(consultation.to_dict())

        return jsonify({"success": True, "consultations": consultations}), 200
    except Exception as e:
        logging.error(f"Error fetching consultations: {e}")
        return jsonify({"success": False, "message": "Failed to fetch consultations"}), 500

# Fetch appointments for an advisor
@advisor_bp.route('/get_appointments/<advisor_uid>', methods=['GET'])
def get_appointments(advisor_uid):
    try:
        appointments = []
        advisor_ref = db.collection('advisors').document(advisor_uid)
        appointments_ref = advisor_ref.collection('appointments').stream()

        for appointment in appointments_ref:
            appointments.append(appointment.to_dict())

        return jsonify({"success": True, "appointments": appointments}), 200
    except Exception as e:
        logging.error(f"Error fetching appointments: {e}")
        return jsonify({"success": False, "message": "Failed to fetch appointments"}), 500