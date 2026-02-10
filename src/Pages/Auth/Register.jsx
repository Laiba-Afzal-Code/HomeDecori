import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../utils/authService.js";
import "./auth.css";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register({ name, email, password });
      toast.info("Registered Successfully")
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      toast.error("Registration Failed")
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create User Account</h2>
        {error && <div className="auth-error">{error}</div>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button>Create Account</button>

        <span onClick={() => navigate("/login")} className="auth-link">
          Back to login
        </span>
          <span onClick={() => navigate("/")} className="auth-link">
         Back to Home
        </span>
      </form>
    </div>
  );
}