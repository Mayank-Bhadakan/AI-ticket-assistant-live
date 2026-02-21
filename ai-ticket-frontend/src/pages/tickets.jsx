import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition.jsx";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch tickets from backend
  const fetchTickets = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

      const data = await res.json();
      setTickets(Array.isArray(data) ? data : data.tickets || []);
    } catch (err) {
      console.error("Fetch tickets error:", err);
      alert("Failed to load tickets. Try logging in again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setForm({ title: "", description: "" });
        fetchTickets();
      } else {
        alert(data.error || "Ticket creation failed");
      }
    } catch (err) {
      console.error("Create ticket error:", err);
      alert("Failed to create ticket. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>

    <div className=" min-h-screen pt-20 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#1E293B] text-white">
    <div className="p-4 max-w-3xl mx-auto text-white flex flex-col">

      {user?.role !== "admin" && ( 
        <>
          <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-4 text-white/80 tracking-tight my-8 ">Create Ticket</h2>
          <div></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 mb-8 mt-4 ">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ticket Title"
              className="input input-bordered w-full bg-gray-900 text-white rounded-2xl"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Ticket Description"
              className="textarea textarea-bordered w-full bg-gray-900 text-white rounded-2xl"
              required
            />
            <button type="submit" className="rounded-3xl mt-5 py-2 px-10 bg-gradient-to-r border-none from-[#6C47FF] to-[#FF2EC8] py-2 font-semibold text-md opacity-90 transition-all duration-300 ease-out hover:scale-[1.03] hover:opacity-100 mx-auto block " disabled={loading}>
              {loading ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>

        </>

      )}

      {user?.role === "admin" && (
        <Link to="/admin" className="btn mb-6 bg-transparent backdrop-blur-md bg-white/10 text-white/90 rounded-b-4xl rounded-t-lg hover:bg-black/20 hover:border-1 hover:border-white/20">Admin Dashboard</Link>
      )}
      
      <h2 className="text-xl font-semibold my-2 mb-4 text-gray-300 tracking-tight mx-6">All Tickets</h2>

      {loading ? (
        <p className="text-gray-300">Loading tickets...</p>
      ) : tickets.length === 0 ? (
        <p className="text-gray-300">No tickets submitted yet.</p>
      ) : (
        <div className="space-y-6">
          {tickets.map((ticket) => (

            <div key={ticket._id}>
              <Link
                to={`/tickets/${ticket._id}`}
                className="group block p-6 bg-[#0F172A]/60 backdrop-blur-xl rounded-2xl border border-white/5 shadow-lg overflow-hidden transform transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_5px_20px_rgba(108,71,0,0.18)] hover:border-[#6C47FF]/40 focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/30">

               <div className="flex items-start justify-between gap-4">
            {/* Title + description */}
            <div className="min-w-0">
              <h3 className="text-white text-lg md:text-xl font-bold leading-tight transition-colors duration-200 group-hover:text-white">
                {ticket.title}
              </h3>

              <p className="text-gray-300 mt-2 text-xs md:text-sm line-clamp-3">
                {ticket.description}
              </p>

              <div className="mt-4 flex items-center gap-4 justify-between">
                <p className="text-xs md:text-sm text-gray-400">
                  Created At: {new Date(ticket.createdAt).toLocaleString()}
                </p>

                <p className="text-sm text-gray-400">|</p>

                <span
                  className="
                    inline-flex items-center gap-2
                    text-xs font-medium
                    px-3 py-1 rounded-full
                    bg-gradient-to-r from-[#6C47FF]/20 to-[#FF2EC8]/20
                    text-[#EDEFF8]
                    border border-white/6
                    shadow-[inset_0_0_10px_rgba(0,0,0,0.12)]
                  "
                >
                  {ticket.status}
                </span>
              </div>
            </div>

            
            <div className="shrink-0 ml-2">
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
              </Link>
            </div>

          ))}
        </div>
      )}
    </div>
     </div>
     </PageTransition>

  );
}
