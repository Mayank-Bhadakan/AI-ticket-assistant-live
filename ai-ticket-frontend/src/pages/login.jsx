import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition.jsx";


export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        console.log(" Login successful, navigating to /tickets...");
        setTimeout(() => navigate("/tickets"), 50);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Something went wrong during login.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
    <div className="min-h-screen flex items-center justify-center  bg-black">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(88,28,135,0.4),transparent),radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.25),transparent)]"></div>

      <div className="card rounded-[1rem] bg-opacity-80 bg-transparent bg-white/20 backgroud-blur-md w-[85%] md:w-full max-w-sm shadow-2xl bg-base-100  ">

       <div class="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-20 animate-gradient-slow mix-blend-overlay"></div>

        <form onSubmit={handleLogin} className="card-body">
          <h2 className="card-title justify-center text-2xl pb-[2rem]">Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered rounded-lg bg-black/50 bg-gradient-to-r from-black/10 to-black/30 shadow-rb"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered rounded-lg bg-black/50 bg-gradient-to-r from-black/10 to-black/30 shadow-rb "
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="form-control mt-4 ">
            <button
              type="submit"
              className="relative btn w-full py-2 bg-purple-500 border-none hover:bg-purple-600 rounded-lg transition-colors  overflow-hidden group"
              disabled={loading}>

                 <span className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] via-[#EC4899] via-[#06B6D4] to-[#3B82F6] animate-gradient-flow opacity-80 "></span>

              <span class="relative z-10 group-hover:text-black transition-colors">
              {loading ? "Logging in..." : "Login"}
              </span>

            </button>
          </div>

           {/* <div className="form-control mt-4">
            <button onClick={() => navigate('/signup')}
              className="btn btn-primary w-full text-xs text-white"> 
              Create a new user ID.!
            </button>

          </div> */}


        </form>
      </div>
    </div>

    </PageTransition>
  );
}
