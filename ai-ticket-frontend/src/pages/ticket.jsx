import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import PageTransition from "../components/PageTransition.jsx";


export default function TicketDetailsPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/tickets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setTicket(data.ticket);
        } else {
          alert(data.message || "Failed to fetch ticket");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading)
    return <div className="text-center mt-20 text-gray-300">Loading ticket details...</div>;
  if (!ticket) return <div className="text-center mt-20 text-gray-300">Ticket not found</div>;

  return (
  //   <PageTransition>

  // <div className="pt-20 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#1E293B] text-white">

  //   <div className="max-w-4xl mx-auto py-4 px-6 ">

  //     <h2 className="text-3xl font-extrabold">Ticket Details</h2>
  //     <p className="text-gray-400 mt-1 mb-4">Full details and actions for this ticket.</p>

  //     <div className="card bg-gray-800 shadow p-4 space-y-4">
  //       <h3 className="text-xl font-semibold">{ticket.title}</h3>
  //       <p>{ticket.description}</p>

  //       {ticket.status && (
  //         <>
  //           <div className="divider">Metadata</div>
  //           <p>
  //             <strong>Status:</strong> {ticket.status}
  //           </p>

  //           {ticket.priority && (
  //             <p>
  //               <strong>Priority:</strong> {ticket.priority}
  //             </p>
  //           )}

  //           {ticket.relatedSkills?.length > 0 && (
  //             <p>
  //               <strong>Related Skills:</strong>{" "}
  //               {ticket.relatedSkills.join(", ")}
  //             </p>
  //           )}

  //           {ticket.helpfulNotes && (
  //             <div>
  //               <strong>Helpful Notes:</strong>
  //               <div className="prose max-w-none rounded mt-2">
  //                 <ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
  //               </div>
  //             </div>
  //           )}

  //           {ticket.assignedTo && (
  //             <p>
  //               <strong>Assigned To:</strong> {ticket.assignedTo?.email}
  //             </p>
  //           )}

  //           {ticket.createdAt && (
  //             <p className="text-sm text-gray-500 mt-2">
  //               Created At: {new Date(ticket.createdAt).toLocaleString()}
  //             </p>
  //           )}
  //         </>
  //       )}

  //     </div>
  //   </div>

  //   </div>
  //    </PageTransition>


 <PageTransition>
    <div className="pt-20 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#1E293B] text-white min-h-screen">
      <div className="max-w-4xl mx-auto py-4 px-6 mt-5">
        <h2 className="text-3xl font-extrabold text-white/80 mx-5">Ticket Details</h2>
        <p className="text-gray-300 text-sm mb-5 mx-5">Full details and actions for this ticket.</p>

        {/* Improved card: lighter bg, better spacing, uses global animation class */}
        <div
          className="rounded-lg p-6 shadow-lg transform transition-all duration-300 ease-out
                     hover:-translate-y-1 hover:shadow-2xl border animate-fade-in border-none"
          style={{
            background: "linear-gradient(180deg, rgba(18,34,50,0.92), rgba(8,20,32,0.94))",
            borderColor: "rgba(255,255,255,0.04)",
          }}
        >
          {/* Title + description + meta */}
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-100">{ticket.title}</h3>
              <p className="text-gray-300 mt-2 leading-relaxed">{ticket.description}</p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {/* Status pill — full opacity gradient expressed with Tailwind fallback */}
                <span
                  className="px-4 py-1.5 rounded-full text-sm text-gray-100 font-medium inline-flex items-center opacity-90"
                  style={{
                    background: "linear-gradient(90deg,#6C47FF,#FF2EC8)",
                    color: "#fff",
                    boxShadow: "0 6px 18px rgba(108,71,255,0.12)",
                  }}
                >
                  {ticket.status}
                </span>

                {/* Priority — higher visual weight, not dim */}
                <span
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold opacity-90 ${
                    ticket.priority === "high"
                      ? "bg-red-600 text-gray-100"
                      : ticket.priority === "medium"
                      ? "bg-yellow-400 text-black"
                      : "bg-sky-600 text-white"
                  }`}
                >
                  Priority: {ticket.priority ?? "low"}
                </span>

                <span className="text-sm text-gray-400 ml-1">
                  Created: {ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : "—"}
                </span>
              </div>

            {/* Assigned to avatar + right-side meta block — labelled clearly */}

              <div className="flex gap-3 items-center mt-10">
                <div className="text-xs text-gray-400">Assigned To:</div>
                <div className="text-sm font-semibold text-gray-200">
                  {ticket.assignedTo?.name || ticket.assignedTo?.email || "Unassigned"}
                <div className="text-xs text-gray-400">Moderator</div>
                </div>
              </div>
      
      
            </div>
          </div>


          <hr className="my-6 border-white/6" />

          {/* Related skills — more bottom margin for breathing space */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-100 mb-3">Related Skills</h4>
            <div className="flex flex-wrap gap-3">
              {ticket.relatedSkills && ticket.relatedSkills.length ? (
                ticket.relatedSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    className="px-3 py-1 rounded-full bg-[rgba(20,24,31,0.9)] text-gray-100 text-sm border border-white/6 transition transform duration-200 hover:scale-105"
                    aria-label={`Skill ${skill}`}
                  >
                    {skill}
                  </button>
                ))
              ) : (
                <div className="text-gray-400 text-sm">No skills provided</div>
              )}
            </div>
          </div>

          {/* Helpful notes — improved color + line-height for readability */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-100 mb-2">Helpful Notes</h4>
            <div className="text-gray-300 text-sm leading-7 space-y-2">
              {ticket.helpfulNotes ? (
                <ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
              ) : (
                <div className="text-gray-400">No additional notes.</div>
              )}
            </div>
          </div>

          {/* Footer metadata — tidy and visible */}
          <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
            <div>
              Ticket ID: <span className="text-gray-200">{ticket._id ?? "—"}</span>
            </div>
            <div>
              Last updated: <span className="text-gray-200">{ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleString() : "—"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageTransition>


  );
}
