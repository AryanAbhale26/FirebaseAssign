import { useState, useEffect } from "react";
import { useFirebase } from "../Context/Firebase";
import { useNavigate } from "react-router-dom";

const categories = [
  "Technical Issue",
  "Billing",
  "Account Support",
  "Feature Request",
  "Bug Report",
  "General Inquiry",
];

const Lists = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    priority: "Low",
    category: "",
    phone: "",
    email: firebase.user ? firebase.user.email : "", // Autofill email if logged in
    status: "Pending",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!firebase.user) {
      navigate("/login");
    }
  }, [firebase.user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firebase.user) {
      alert("You must be logged in to submit a ticket.");
      return;
    }

    const newTicket = {
      ...ticket,
      createdBy: firebase.user.email,
      createdAt: new Date().toISOString(),
    };

    try {
      await firebase.addTicket(newTicket);
      alert("Ticket submitted successfully!");
      setTicket({
        title: "",
        description: "",
        priority: "Low",
        category: "",
        phone: "",
        email: firebase.user ? firebase.user.email : "",
        status: "Pending",
      });

      navigate("/");
    } catch (error) {
      console.error("Error submitting ticket:", error);
      alert("Failed to submit ticket.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="p-6 bg-gray-800 text-white shadow-md rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Submit a Ticket
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            value={ticket.title}
            onChange={handleChange}
            placeholder="Ticket Title"
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={ticket.description}
            onChange={handleChange}
            placeholder="Describe your issue..."
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded"
            required
          ></textarea>

          {/* Priority & Category */}
          <div className="flex gap-4">
            <select
              name="priority"
              value={ticket.priority}
              onChange={handleChange}
              className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>

            {/* Category Dropdown */}
            <select
              name="category"
              value={ticket.category}
              onChange={handleChange}
              className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded"
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            value={ticket.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded"
            required
          />

          {/* Phone Number */}
          <input
            type="tel"
            name="phone"
            value={ticket.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg w-full transition"
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default Lists;
