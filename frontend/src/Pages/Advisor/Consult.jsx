import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  MessageSquare,
  PhoneCall,
  X,
  User,
  Star,
  Clock,
  Mail,
} from "lucide-react";

const ConsultAdvisor = () => {
  // State management
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const [modalType, setModalType] = useState(null); // "message", "contact", "appointment"
  const [messageText, setMessageText] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const modalRef = useRef(null);

  // Fetch advisors from the backend
  useEffect(() => {
    const fetchAdvisors = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/advisors");
        if (!response.ok) {
          throw new Error("Failed to fetch advisors");
        }
        const data = await response.json();
        if (data.success) {
          setAdvisors(data.advisors);
        } else {
          showNotification("Error loading advisors", "error");
        }
      } catch (error) {
        console.error("Error fetching advisors:", error);
        showNotification("Could not load advisors", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisors();
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedAdvisor(null);
    setMessageText("");
    setAppointmentDate("");
    setAppointmentTime("");
  };

  // Open modal for message
  const openMessageModal = (advisor) => {
    setSelectedAdvisor(advisor);
    setModalType("message");
  };

  // Open modal for contact
  const openContactModal = (advisor) => {
    setSelectedAdvisor(advisor);
    setModalType("contact");
  };

  // Open modal for appointment
  const openAppointmentModal = (advisor) => {
    setSelectedAdvisor(advisor);
    setModalType("appointment");
  };

  // Handle sending a message to an advisor
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) {
      showNotification("Please enter a message", "error");
      return;
    }

    try {
      const senderUid = sessionStorage.getItem("uid");
      if (!senderUid) {
        showNotification("Please log in to send messages", "error");
        return;
      }

      const response = await fetch("/api/send_message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_uid: senderUid,
          advisor_uid: selectedAdvisor.uid,
          message: messageText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      if (data.success) {
        showNotification("Message sent successfully", "success");
        closeModal();
      } else {
        showNotification("Error sending message", "error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      showNotification("Failed to send message", "error");
    }
  };

  // Handle contacting an advisor
  const handleContact = async (e) => {
    e.preventDefault();
    try {
      const senderUid = sessionStorage.getItem("uid");
      if (!senderUid) {
        showNotification("Please log in to contact advisors", "error");
        return;
      }

      const response = await fetch("/api/request_consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_uid: senderUid,
          advisor_uid: selectedAdvisor.uid,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to request consultation");
      }

      const data = await response.json();
      if (data.success) {
        showNotification("Consultation requested successfully", "success");
        closeModal();
      } else {
        showNotification("Error requesting consultation", "error");
      }
    } catch (error) {
      console.error("Error requesting consultation:", error);
      showNotification("Failed to request consultation", "error");
    }
  };

  // Handle setting an appointment with an advisor
  const handleSetAppointment = async (e) => {
    e.preventDefault();
    if (!appointmentDate || !appointmentTime) {
      showNotification("Please select both date and time", "error");
      return;
    }

    try {
      const senderUid = sessionStorage.getItem("uid");
      if (!senderUid) {
        showNotification("Please log in to set appointments", "error");
        return;
      }

      const response = await fetch("/api/set_appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_uid: senderUid,
          advisor_uid: selectedAdvisor.uid,
          date: appointmentDate,
          time: appointmentTime,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to set appointment");
      }

      const data = await response.json();
      if (data.success) {
        showNotification("Appointment set successfully", "success");
        closeModal();
      } else {
        showNotification("Error setting appointment", "error");
      }
    } catch (error) {
      console.error("Error setting appointment:", error);
      showNotification("Failed to set appointment", "error");
    }
  };

  // Render star rating
  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}/5</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Financial Advisors
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Connect with expert financial advisors to help plan your future
          </p>
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-md flex items-center ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <span>{notification.message}</span>
          <button
            onClick={() =>
              setNotification({ show: false, message: "", type: "" })
            }
            className="ml-3 focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Filters and search (placeholder) */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">
              Available Advisors
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search advisors..."
                className="py-2 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Advisors grid */}
            {advisors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advisors.map((advisor) => (
                  <div
                    key={advisor.uid}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {advisor.photoUrl ? (
                            <img
                              src={advisor.photoUrl}
                              alt={advisor.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User className="h-6 w-6 text-gray-500" />
                          )}
                        </div>
                        <div className="ml-4">
                          <h2 className="text-xl font-semibold mb-1">
                            {advisor.name}
                          </h2>
                          <p className="text-blue-600 font-medium text-sm">
                            {advisor.specialization}
                          </p>
                          {advisor.rating && renderRating(advisor.rating)}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-700 text-sm line-clamp-3">
                          {advisor.bio}
                        </p>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>
                            Available:{" "}
                            {advisor.availability || "Mon-Fri, 9am-5pm"}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mt-1">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>
                            Response time: {advisor.responseTime || "24 hours"}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <button
                          onClick={() => openMessageModal(advisor)}
                          className="flex items-center justify-center bg-white border border-blue-500 text-blue-500 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>Message</span>
                        </button>
                        <button
                          onClick={() => openContactModal(advisor)}
                          className="flex items-center justify-center bg-white border border-green-500 text-green-500 px-3 py-2 rounded-md hover:bg-green-50 transition-colors"
                        >
                          <PhoneCall className="h-4 w-4 mr-1" />
                          <span>Contact</span>
                        </button>
                        <button
                          onClick={() => openAppointmentModal(advisor)}
                          className="flex items-center justify-center bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>Book</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  No advisors available at the moment.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal for messages/contact/appointment */}
      {modalType && selectedAdvisor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {modalType === "message" && "Send Message"}
                  {modalType === "contact" && "Request Consultation"}
                  {modalType === "appointment" && "Schedule Appointment"}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">
                    {selectedAdvisor.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedAdvisor.specialization}
                  </p>
                </div>
              </div>

              {/* Message Modal */}
              {modalType === "message" && (
                <form onSubmit={handleSendMessage}>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="4"
                      placeholder="Type your message here..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}

              {/* Contact Modal */}
              {modalType === "contact" && (
                <form onSubmit={handleContact}>
                  <p className="text-sm text-gray-600 mb-4">
                    Are you sure you want to request a consultation with{" "}
                    {selectedAdvisor.name}?
                  </p>
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Request Consultation
                  </button>
                </form>
              )}

              {/* Appointment Modal */}
              {modalType === "appointment" && (
                <form onSubmit={handleSetAppointment}>
                  <div className="mb-4">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      value={appointmentTime}
                      onChange={(e) => setAppointmentTime(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Schedule Appointment
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultAdvisor;
