// src/pages/admin.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition.jsx";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ role: "", skills: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingFor, setSavingFor] = useState(null); // email being saved
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const searchDebounce = useRef(null);

  useEffect(() => {
    // If no token, force login
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  // Fetch all users (admin-only)
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401 || res.status === 403) {
        // unauthorized or not admin
        setError("Not authorized. Please login as admin.");
        // optional: force logout
        // localStorage.removeItem("token");
        // navigate("/login");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch users");
        setLoading(false);
        return;
      }

      // ensure array
      const list = Array.isArray(data) ? data : [];
      setUsers(list);
      setFilteredUsers(list);
    } catch (err) {
      console.error("Error fetching users", err);
      setError("Unable to fetch users. Check server.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user.email);
    setFormData({
      role: user.role || "user",
      skills: Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setFormData({ role: "", skills: "" });
  };

  const handleUpdate = async () => {
    if (!editingUser) return;
    setSavingFor(editingUser);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/update-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: editingUser,
          role: formData.role,
          // backend accepts either array or CSV string; we'll send CSV for simplicity
          skills: formData.skills,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update user");
      }

      // Update local state optimistically
      setUsers((prev) =>
        prev.map((u) =>
          u.email === editingUser
            ? { ...u, role: data.user?.role ?? formData.role, skills: data.user?.skills ?? (formData.skills.split(",").map(s=>s.trim()).filter(Boolean)) }
            : u
        )
      );

      setFilteredUsers((prev) =>
        prev.map((u) =>
          u.email === editingUser
            ? { ...u, role: data.user?.role ?? formData.role, skills: data.user?.skills ?? (formData.skills.split(",").map(s=>s.trim()).filter(Boolean)) }
            : u
        )
      );

      setEditingUser(null);
      setFormData({ role: "", skills: "" });
      alert("User updated");
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed: " + err.message);
    } finally {
      setSavingFor(null);
    }
  };

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);

    // debounce to avoid rapid filtering on each keypress
    if (searchDebounce.current) clearTimeout(searchDebounce.current);
    searchDebounce.current = setTimeout(() => {
      const query = q.trim().toLowerCase();
      if (!query) {
        setFilteredUsers(users);
      } else {
        setFilteredUsers(users.filter((u) => (u.email || "").toLowerCase().includes(query)));
      }
    }, 200);
  };

  if (loading) return <div className="p-6">Loading admin dashboard...</div>;
  if (error) return <div className="p-6 text-red-400">Error: {error}</div>;

  // return (
  //   <PageTransition>

  //   <div className="max-w-4xl mx-auto mt-10 pt-20">
  //     <h1 className="text-2xl font-bold mb-6">Admin Panel — Manage Users</h1>

  //     <input
  //       type="text"
  //       className="input input-bordered w-full mb-6"
  //       placeholder="Search by email"
  //       value={searchQuery}
  //       onChange={handleSearch}
  //     />

  //     {filteredUsers.length === 0 ? (
  //       <div>No users found</div>
  //     ) : (
  //       filteredUsers.map((user) => (
  //         <div key={user._id} className="bg-base-100 shadow rounded p-4 mb-4 border">
  //           <div className="flex justify-between items-start">
  //             <div>
  //               <p className="font-medium">{user.email}</p>
  //               <p className="text-xs text-gray-400">{user._id}</p>
  //             </div>

  //             <div className="flex gap-2 items-center">
  //               {editingUser === user.email ? (
  //                 <>
  //                   <button className="btn btn-sm btn-ghost" onClick={handleCancelEdit}>Cancel</button>
  //                   <button
  //                     className="btn btn-sm btn-success"
  //                     onClick={handleUpdate}
  //                     disabled={savingFor === user.email}
  //                   >
  //                     {savingFor === user.email ? "Saving..." : "Save"}
  //                   </button>
  //                 </>
  //               ) : (
  //                 <button className="btn btn-sm btn-primary" onClick={() => handleEditClick(user)}>
  //                   Edit
  //                 </button>
  //               )}
  //             </div>
  //           </div>

  //           <div className="mt-3">
  //             <p><strong>Role:</strong> {user.role}</p>
  //             <p>
  //               <strong>Skills:</strong>{" "}
  //               {user.skills && user.skills.length ? user.skills.join(", ") : "N/A"}
  //             </p>

  //             {editingUser === user.email && (
  //               <div className="mt-3 space-y-2">
  //                 <select
  //                   className="select select-bordered w-full"
  //                   value={formData.role}
  //                   onChange={(e) => setFormData({ ...formData, role: e.target.value })}
  //                 >
  //                   <option value="user">User</option>
  //                   <option value="moderator">Moderator</option>
  //                   <option value="admin">Admin</option>
  //                 </select>

  //                 <input
  //                   type="text"
  //                   placeholder="Comma-separated skills"
  //                   className="input input-bordered w-full"
  //                   value={formData.skills}
  //                   onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
  //                 />
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       ))
  //     )}
  //   </div>

  //   </PageTransition>
  // );


 return (
  <PageTransition>
    {/* Page wrapper — refined professional dark gradient */}
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#1E293B] text-white">
      <div className="max-w-4xl mx-auto mt-10 px-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel — Manage Users</h1>

        {/* Search box: translucent, slightly blurred */}
        <input
          type="text"
          className="w-full mb-6 rounded-lg px-4 py-3 placeholder-gray-300 text-white
                     backdrop-blur-sm bg-white/6 border border-white/8 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10
                     transition duration-200"
          placeholder="Search by email"
          value={searchQuery}
          onChange={handleSearch}
        />

        {filteredUsers.length === 0 ? (
          <div className="text-gray-300 py-8">No users found</div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="relative rounded-lg p-4 mb-5 overflow-hidden transform transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(180deg, rgba(18,28,38,0.5), rgba(10,16,22,0.7))",
                border: "1px solid rgba(255,255,255,0.04)",
                // small bottom-right focused shadow only (no top/left highlight)
                boxShadow: "8px 12px 28px rgba(2,6,23,0.48)",
              }}
            >
              <div className="flex justify-between items-start">
                <div className="min-w-0">
                  <p className="font-medium text-gray-100 break-words">{user.email}</p>
                  <p className="text-xs text-gray-400 mt-1 break-words">{user._id}</p>
                </div>

                <div className="flex gap-2 items-center">
                  {editingUser === user.email ? (
                    <>
                      <button
                        className="btn btn-sm btn-ghost px-3 py-1 rounded-md text-sm transition-transform duration-150 hover:scale-[1.03]"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>

                      <button
                        className="btn btn-sm btn-success px-3 py-1 rounded-md text-sm transition-transform duration-150 hover:scale-[1.03] disabled:opacity-60"
                        onClick={handleUpdate}
                        disabled={savingFor === user.email}
                      >
                        {savingFor === user.email ? "Saving..." : "Save"}
                      </button>
                    </>
                  ) : (
                    /* Professional transparent Edit button: subtle border, darker on hover */
                    <button
                      className="px-3 py-1 rounded-md text-sm font-semibold text-white border border-white/10 backdrop-blur-md bg-white/10 bg-transparent
                                 hover:bg-white/30 hover:text-white transition duration-150 focus:outline-none focus:ring-2 focus:ring-[#6C47FF]/20"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <p className="text-gray-200"><strong>Role:</strong> {user.role}</p>
                <p className="text-gray-200 mt-1">
                  <strong>Skills:</strong>{" "}
                  {user.skills && user.skills.length ? (
                    <span className="text-gray-300">{user.skills.join(", ")}</span>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </p>

                {editingUser === user.email && (
                  <div className="mt-3 space-y-2">
                    {/* Updated select classes exactly as requested */}
                    <select
                      className="select select-bordered w-full bg-transparent text-white border-white/10 cursor-pointer bg-black/50 appearance-none"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>

                    <input
                      type="text"
                      placeholder="Comma-separated skills"
                      className="input input-bordered w-full bg-transparent text-white border-white/10"
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    />
                  </div>
                )}
              </div>

              {/* removed the animated accent under the edit button as requested */}
            </div>
          ))
        )}
      </div>
    </div>
  </PageTransition>
);


}
