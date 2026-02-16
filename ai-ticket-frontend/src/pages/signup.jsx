import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition.jsx";


export default function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user", // default to 'user'
    skills: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Ensure skills are an array
    const skillsArray = Array.isArray(form.skills)
      ? form.skills
      : form.skills
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean);

    const bodyData = {
      email: form.email,
      password: form.password,
      role: form.role,
      skills: skillsArray,
    };

    console.log("🧠 Sending signup data:", bodyData);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/tickets");
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (err) {
    console.error("Signup error:", err);
    alert("Something went wrong during signup");
  } finally {
    setLoading(false);
  }
};


  return (
    <PageTransition>

    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(88,28,135,0.4),transparent),radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.25),transparent)]"></div>

      <div className="card rounded-[1rem] bg-opacity-80 bg-transparent bg-white/20 backgroud-blur-md w-full max-w-sm shadow-2xl bg-base-100 ">

       <div class="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-20 animate-gradient-slow mix-blend-overlay"></div>

        <form onSubmit={handleSignup} className="card-body space-y-3">
          <h2 className="card-title justify-center text-2xl mb-2">
            Create Account
          </h2>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered rounded-lg bg-black/50 bg-gradient-to-r from-black/10 to-black/30 shadow-rb"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered rounded-lg bg-black/50 bg-gradient-to-r from-black/10 to-black/30 shadow-rb"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Role Dropdown */}
          <select
            name="role"
            className="select select-bordered rounded-lg bg-black/50 text-white appearance-none  shadow-rb cursor-pointer"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
          </select>

          {/* Skills */}
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma-separated, e.g. React, Node, MongoDB)"
            className="input input-bordered rounded-lg bg-black/50 bg-gradient-to-r from-black/10 to-black/30 shadow-rb"
            value={form.skills}
            onChange={handleChange}
            required
          />

          {/* Submit */}
          <button
            type="submit"
            className="relative btn w-full py-2 bg-purple-500 border-none hover:bg-purple-600 rounded-lg transition-colors  overflow-hidden group"
            disabled={loading}
          >

            <span className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] via-[#EC4899] via-[#06B6D4] to-[#3B82F6] animate-gradient-flow opacity-80 "></span>

            <span class="relative z-10 group-hover:text-black transition-colors">
            {loading ? "Signing up..." : "Sign Up"}
            </span>
            
          </button>
        </form>
      </div>
    </div>

    </PageTransition>
  );
}
