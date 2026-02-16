import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [loading, setLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  const token = localStorage.getItem("token");


  // scrolling navbar logic
 useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      const threshold = window.innerHeight * 0.3 ; // 30%


      if (currentScroll > lastScroll && currentScroll > threshold ) {
        // scrolling down → hide navbar
        setIsHidden(true);
      } else {
        // scrolling up → show navbar
        setIsHidden(false);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);


  // safe parse user
  let user = null;
  try {
    const raw = localStorage.getItem("user");
    user = raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn("Failed to parse user from localStorage", e);
    user = null;
  }

  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);

    try {
      // Optional: call backend logout for logging or token validation
      // If you don't have an API route, this call will fail — you can keep it or remove it.
      if (token) {
        await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }).catch((err) => {
          // swallow network errors — still proceed to remove local state
          console.warn("Optional backend logout failed:", err);
        });
      }

      // Clear local client state
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tickets"); // if you store tickets locally
      // clear any other app keys you use:
      // localStorage.removeItem("some-other-key");

      // Redirect to login page
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      // best-effort: still clear client state and redirect
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-[100%] flex justify-center " >

    <div className={`navbar bg-base-200 px-4 w-[80%] fixed top-0 z-50 shadow-md bg-transparant backdrop-blur-md bg-white/10 rounded-b-4xl transition-transform duration-500 ${isHidden ? "-translate-y-full" : "translate-y-0"}`} >

      <div className="flex-1">
        <Link to="/" className="btn border-none shadow-none text-2xl bg-gradient-to-r from-purple-600 via-pink-400 to-cyan-400 bg-clip-text text-transparent tracking-tight ">
          Ticket AI
        </Link>
      </div>

      <div className="flex items-center gap-4 px-5">
        {!token ? (
          <>
            <Link to="/signup" className="group relative text-sm tracking-tight font-bold text-white/70 opacity-70 hover:opacity-100 transition-all ">
              Signup
              <span className="absolute left-1/2 bottom-[-7px] h-[3px] w-0 bg-gradient-to-r from-tranparent via-purple-500 via-cyan-400 via-purple-500 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.2)] rounded-[50%] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link to="/login" className="group relative text-sm tracking-tight font-bold text-white/70 opacity-70 hover:opacity-100 ">
              Login
              <span className="absolute left-1/2 bottom-[-7px] h-[3px] w-0 bg-gradient-to-r from-tranparent via-purple-500 via-cyan-400 via-purple-500 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.2)] rounded-[50%] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          </>
        ) : (
          <>
            <div className="text-sm pr-2 text-white/80 font-bold ">
              <div>Hi, <span className="font-medium">{user?.email ?? "User"}</span></div>
              <div className="text-xs text-gray-500">{user?.role ?? ""}</div>
            </div>

            {user && user.role === "admin" && (
              <Link to="/admin" className="btn btn-sm btn-outline">
                Admin
              </Link>
            )}

            <button
              onClick={logout}
              className="btn btn-sm btn-error font-bold m-2 opacity-70 hover:opacity-100 transition-all duration-200 "
              disabled={loading}
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </>
        )}
      </div>
    </div>
    </div>
  );
}
