import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./auth.css";
import { forgotPassword } from "../../utils/authService";
import {
  FaHome,
  FaCouch,
  FaChair,
  
  FaBlogger,
} from "react-icons/fa";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

   const { data } = await forgotPassword({
  email
});

      setMessage(data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="floating-icons">
              <FaCouch className="icon couch" />
              <FaChair className="icon chair" />
              <FaHome className="icon homeIcon" />
              <FaBlogger className="icon blogicon" />
            </div>
      <div className="auth-card">
        <h2 className="authh2">Forgot Password</h2>

        <p className="auth-info">
          Enter your email address and we'll send you a password reset link.
        </p>

        {message && <div className="success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <Link to="/login" className="auth-link">Back to Login</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;