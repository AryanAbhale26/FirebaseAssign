import React, { useEffect, useState } from "react";
import { useFirebase } from "../Context/Firebase";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";

const Dashboard = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!firebase.user) {
      navigate("/login");
    }
  }, [firebase.user, navigate]);

  // Fetch only the logged-in user's queries
  useEffect(() => {
    const fetchUserQueries = async () => {
      if (!firebase.user) return;
      setLoading(true);
      try {
        const allQueries = await firebase.getTickets();
        const userQueries = allQueries.filter(
          (query) => query.createdBy === firebase.user.email
        );
        setQueries(userQueries);
      } catch (error) {
        console.error("Error fetching user queries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserQueries();
  }, [firebase.user, firebase]);

  // Handle updating a ticket
  const handleUpdate = async (id, updatedData) => {
    try {
      await firebase.updateTicket(id, updatedData);
      setQueries((prevQueries) =>
        prevQueries.map((q) => (q.id === id ? { ...q, ...updatedData } : q))
      );
    } catch (error) {
      console.error("Error updating query:", error);
    }
  };

  // Handle deleting a ticket
  const handleDelete = async (id) => {
    try {
      await firebase.deleteTicket(id);
      setQueries((prevQueries) => prevQueries.filter((q) => q.id !== id));
    } catch (error) {
      console.error("Error deleting query:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pl-70 p-5">
      <h1 className="text-2xl font-bold mb-5">My Queries</h1>

      {loading ? (
        <p>Loading...</p>
      ) : queries.length > 0 ? (
        <div className="grid gap-2 sm:grid-cols-4 lg:grid-cols-4">
          {queries.map((query) => (
            <Card
              key={query.id}
              query={query}
              expanded={expandedCardId === query.id}
              onExpand={() =>
                setExpandedCardId(expandedCardId === query.id ? null : query.id)
              }
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-gray-400 text-lg">No queries found.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
