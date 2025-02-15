import React, { useState } from "react";
import { FaEdit, FaTrash, FaTimes, FaCheck } from "react-icons/fa";

const Card = ({ query, onUpdate, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    title: query.title,
    description: query.description,
    email: query.email,
    phone: query.phone,
  });

  // Handle update
  const handleUpdate = () => {
    onUpdate(query.id, updatedData);
    setShowEditModal(false);
  };

  return (
    <>
      {/* Query Card */}
      <div className="bg-gray-800 shadow-lg p-4 rounded-lg w-72">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">{query.title}</h2>
          <span
            className={`text-sm font-semibold px-2 py-1 rounded ${
              query.status === "Pending" ? "bg-yellow-500" : "bg-green-500"
            }`}
          >
            {query.status}
          </span>
        </div>

        <p
          className="text-gray-300 mt-2 text-sm"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: showFullDescription ? "unset" : 3,
            overflow: "hidden",
          }}
        >
          {query.description}
        </p>

        <div className="mt-3 text-gray-400 text-sm">
          <p>
            <strong>Priority:</strong> {query.priority}
          </p>
          <p>
            <strong>Category:</strong> {query.category}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {query.email ? query.email : "No Email Provided"}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            {query.phone ? query.phone : "No Phone Provided"}
          </p>
          <p>
            <strong>Assigned To:</strong>{" "}
            {query.assignedTo ? query.assignedTo : "Not Assigned"}
          </p>
        </div>

        {/* Display Attachment if Available */}
        {query.attachment && (
          <div className="mt-3">
            <p className="text-gray-400 text-sm">📎 Attachment:</p>
            <a
              href={query.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              {query.attachmentName || "View File"}
            </a>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setShowEditModal(true)}
            className="bg-blue-500 text-white p-2 rounded flex items-center gap-1"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={() => onDelete(query.id)}
            className="bg-red-500 text-white p-2 rounded flex items-center gap-1"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 w-3/5 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Query</h2>

            {/* Title */}
            <label className="text-gray-400 text-sm">Title</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-600 bg-gray-800 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={updatedData.title}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, title: e.target.value })
              }
            />

            {/* Description */}
            <label className="text-gray-400 text-sm">Description</label>
            <textarea
              className="w-full p-2 border border-gray-600 bg-gray-800 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={updatedData.description}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, description: e.target.value })
              }
            />

            {/* Email */}
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-600 bg-gray-800 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={updatedData.email}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, email: e.target.value })
              }
            />

            {/* Phone Number */}
            <label className="text-gray-400 text-sm">Phone Number</label>
            <input
              type="tel"
              className="w-full p-2 border border-gray-600 bg-gray-800 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={updatedData.phone}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, phone: e.target.value })
              }
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded flex items-center gap-1"
              >
                <FaTimes /> Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-1"
              >
                <FaCheck /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
