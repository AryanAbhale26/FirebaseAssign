// import { useEffect, useState } from "react";
// import { useFirebase } from "../Context/Firebase";

// export const AgentDashboard = () => {
//   const firebase = useFirebase();
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     const fetchTickets = async () => {
//       const ticketsData = await firebase.getTickets();
//       setTickets(ticketsData);
//     };
//     fetchTickets();
//   }, [firebase]);

//   const updateStatus = async (ticketId, status) => {
//     await firebase.updateTicket(ticketId, { status });
//     setTickets((prev) =>
//       prev.map((t) => (t.id === ticketId ? { ...t, status } : t))
//     );
//   };

//   return (
//     <div>
//       <h2>Support Agent Dashboard</h2>
//       {tickets.map((ticket) => (
//         <div key={ticket.id}>
//           <p>{ticket.title}</p>
//           <p>Status: {ticket.status}</p>
//           <button onClick={() => updateStatus(ticket.id, "In Progress")}>
//             In Progress
//           </button>
//           <button onClick={() => updateStatus(ticket.id, "Resolved")}>
//             Resolved
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };
