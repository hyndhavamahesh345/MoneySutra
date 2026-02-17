import React, { useState, useEffect } from "react";
import { Bell, Calendar, CheckCircle, XCircle, Mail, User, Clock } from "lucide-react";

const FinancialAdvisorDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [consultationRequests, setConsultationRequests] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Get advisor UID from session storage
  const advisorUid = typeof window !== "undefined" ? sessionStorage.getItem("uid") : null;

  useEffect(() => {
    if (!advisorUid) {
      console.log("not logged in");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch messages, consultations, and appointments in parallel
        const [messagesRes, consultationsRes, appointmentsRes] = await Promise.all([
          fetch(`/api/get_messages/${advisorUid}`),
          fetch(`/api/get_consultations/${advisorUid}`),
          fetch(`/api/get_appointments/${advisorUid}`)
        ]);
        
        if (!messagesRes.ok) throw new Error("Failed to fetch messages");
        if (!consultationsRes.ok) throw new Error("Failed to fetch consultations");
        if (!appointmentsRes.ok) throw new Error("Failed to fetch appointments");
        
        const messagesData = await messagesRes.json();
        const consultationsData = await consultationsRes.json();
        const appointmentsData = await appointmentsRes.json();
        
        if (messagesData.success) setMessages(messagesData.messages);
        if (consultationsData.success) setConsultationRequests(consultationsData.consultations);
        if (appointmentsData.success) setAppointments(appointmentsData.appointments);
      } catch (error) {
        console.error("Error fetching data:", error);
        showNotification("Failed to load data. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [advisorUid]);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleConsultationAction = async (requestId, action) => {
    try {
      const response = await fetch("/api/update_consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action }),
      });
      
      if (!response.ok) throw new Error("Failed to update consultation request");
      
      const data = await response.json();
      if (data.success) {
        setConsultationRequests((prev) =>
          prev.map((req) => (req.id === requestId ? { ...req, status: action } : req))
        );
        showNotification(
          `Request ${action === "accepted" ? "accepted" : "rejected"} successfully`, 
          "success"
        );
      }
    } catch (error) {
      console.error("Error updating consultation request:", error);
      showNotification("Failed to update request. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification component */}
      {notification.show && (
        <div 
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-md flex items-center ${
            notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {notification.type === "success" ? 
            <CheckCircle className="w-5 h-5 mr-2" /> : 
            <XCircle className="w-5 h-5 mr-2" />
          }
          {notification.message}
        </div>
      )}

      {/* Dashboard header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Financial Advisor Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
              Advisor
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Messages section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
              {messages.length > 0 && (
                <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {messages.length}
                </span>
              )}
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-6 text-center text-gray-500">Loading messages...</div>
              ) : messages.length > 0 ? (
                messages.map((msg) => (
                  <div key={msg.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">Client {msg.sender_uid}</p>
                          <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">{msg.message}</p>
                        <div className="mt-2">
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Reply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">No new messages.</div>
              )}
            </div>
          </div>

          {/* Consultation requests section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center">
              <Calendar className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800">Consultation Requests</h2>
              {consultationRequests.length > 0 && (
                <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {consultationRequests.length}
                </span>
              )}
            </div>
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-6 text-center text-gray-500">Loading requests...</div>
              ) : consultationRequests.length > 0 ? (
                consultationRequests.map((req) => (
                  <div key={req.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">Client {req.sender_uid}</p>
                          <p className="text-xs text-gray-500">{new Date(req.timestamp).toLocaleString()}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">
                          Requested a financial consultation
                        </p>
                        {req.status ? (
                          <p className={`mt-2 text-sm ${
                            req.status === "accepted" ? "text-green-600" : "text-red-600"
                          }`}>
                            {req.status === "accepted" ? "Accepted" : "Rejected"}
                          </p>
                        ) : (
                          <div className="mt-3 flex space-x-3">
                            <button 
                              onClick={() => handleConsultationAction(req.id, "accepted")} 
                              className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              Accept
                            </button>
                            <button 
                              onClick={() => handleConsultationAction(req.id, "rejected")} 
                              className="px-3 py-1.5 bg-white text-gray-700 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">No new consultation requests.</div>
              )}
            </div>
          </div>
        </div>

        {/* Appointments section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center">
            <Clock className="w-5 h-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
            {appointments.length > 0 && (
              <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {appointments.length}
              </span>
            )}
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-6 text-center text-gray-500">Loading appointments...</div>
            ) : appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div key={appointment.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">Client {appointment.sender_uid}</p>
                        <p className="text-xs text-gray-500">{new Date(appointment.timestamp).toLocaleString()}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-700">
                        Scheduled for {appointment.date} at {appointment.time}
                      </p>
                      <p className={`mt-2 text-sm ${
                        appointment.status === "accepted" ? "text-green-600" : "text-red-600"
                      }`}>
                        {appointment.status === "accepted" ? "Confirmed" : "Pending"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">No upcoming appointments.</div>
            )}
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Unread Messages</h3>
                <p className="text-2xl font-semibold text-gray-900">{messages.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Pending Requests</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {consultationRequests.filter(req => !req.status).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
                <p className="text-2xl font-semibold text-gray-900">
                  {appointments.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinancialAdvisorDashboard;