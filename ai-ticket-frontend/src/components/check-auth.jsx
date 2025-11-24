import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckAuth({ children, protectedRoute }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (protectedRoute) {
      if (!token) {
        // no token -> redirect to login
        navigate("/login");
      } else {
        // token exists -> allow access
        setLoading(false);
      }
    } else {
      if (token) {
        // Already logged in -> redirect to tickets
        navigate("/tickets");
      } else {
        setLoading(false);
      }
    }
  }, [navigate, protectedRoute]);

  if (loading) {
    return <div>loading...</div>;
  }
  return children;
}

export default CheckAuth;