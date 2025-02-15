import { useState, useEffect } from "react";
import { useFirebase } from "../Context/Firebase";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const firebase = useFirebase();
  const navigate = useNavigate(); // Redirect hook
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [manualEmails, setManualEmails] = useState({});

  useEffect(() => {
    const fetchTickets = async () => {
      const data = await firebase.getTickets();
      console.log("Fetched Tickets:", data); // Debugging
      setTickets(data);
    };

    const fetchAgents = async () => {
      const users = await firebase.getSupportAgents();
      setAgents(users);
    };

    fetchTickets();
    fetchAgents();
  }, []);

  const handleStatusChange = async (ticketId, newStatus) => {
    if (!newStatus) return;
    try {
      await firebase.updateTicket(ticketId, { status: newStatus });
      alert("Status updated successfully!");
      const updatedTickets = await firebase.getTickets();
      setTickets(updatedTickets);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleManualEmailChange = (ticketId, email) => {
    setManualEmails((prev) => ({ ...prev, [ticketId]: email }));
  };

  const handleManualAssign = async (ticketId) => {
    const email = manualEmails[ticketId];
    if (!email) return;
    try {
      await firebase.updateTicket(ticketId, { assignedTo: email });
      alert("Ticket assigned successfully!");
      const updatedTickets = await firebase.getTickets();
      setTickets(updatedTickets);
      setManualEmails((prev) => ({ ...prev, [ticketId]: "" })); // Clear input
    } catch (error) {
      console.error("Error manually assigning ticket:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.logout();
      navigate("/", { replace: true }); // Ensure proper redirection
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {/* Admin Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Admin Dashboard</h2>
        <button
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Tickets Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 text-left">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-3 border border-gray-600">Title</th>
              <th className="p-3 border border-gray-600 max-w-xs">
                Description
              </th>
              <th className="p-3 border border-gray-600">Priority</th>
              <th className="p-3 border border-gray-600">Status</th>
              <th className="p-3 border border-gray-600">Assigned To</th>
              <th className="p-3 border border-gray-600">Created By</th>
              <th className="p-3 border border-gray-600">Update</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border border-gray-600 bg-gray-800"
              >
                <td className="p-3">{ticket.title}</td>
                <td
                  className="p-3 max-w-xs whitespace-normal break-words"
                  title={ticket.description}
                >
                  {ticket.description}
                </td>

                <td className="p-3">{ticket.priority}</td>
                <td className="p-3">
                  <select
                    value={ticket.status || "Pending"}
                    onChange={(e) =>
                      handleStatusChange(ticket.id, e.target.value)
                    }
                    className="bg-gray-700 text-white p-1 rounded w-full"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Fulfilled">Fulfilled</option>
                  </select>
                </td>
                <td className="p-3">
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={manualEmails[ticket.id] ?? ticket.assignedTo ?? ""}
                    onChange={(e) =>
                      handleManualEmailChange(ticket.id, e.target.value)
                    }
                    className="bg-gray-700 text-white p-1 rounded w-full"
                  />
                </td>
                <td className="p-3">
                  {/* FIXED: Ensures the correct email is displayed */}
                  {ticket.email || ticket.createdBy || "Unknown"}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleManualAssign(ticket.id)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
