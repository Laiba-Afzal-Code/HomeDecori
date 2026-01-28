import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/authService.js";
import "./auth.css";

import { toast } from "react-toastify";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.user.role === "admin") {
        navigate("/admin");
        toast.info("Admin Login Successfully");
      } else {
        navigate("/");
        toast.info("User Login Successfully");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Admin / User Login</h2>
        {error && <div className="auth-error">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <span onClick={() => navigate("/register")} className="auth-link">
          Create user account
        </span>
      </form>
    </div>
  );
}
