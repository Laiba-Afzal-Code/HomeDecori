import { useState } from "react";
import { resetPassword } from "../../utils/authService";
import { useParams, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./auth.css";

import {
  FaHome,
  FaCouch,
  FaChair,
  
  FaBlogger,
} from "react-icons/fa";
function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return setMessage("Passwords do not match");
    }

    try {
     const { data } = await resetPassword(token, {
  password
});

      setMessage(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong"
      );
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

        <h2 className="authh2">Reset Password</h2>

        <p>
          Create your new password below.
        </p>


        {message && (
          <div className="success">
            {message}
          </div>
        )}


        <form onSubmit={handleSubmit}>


          {/* New Password */}
          <div className="input-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />


            <span
              className="eye-icon"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {
                showPassword 
                ? <FaEyeSlash/>
                : <FaEye/>
              }
            </span>

          </div>



          {/* Confirm Password */}
          <div className="input-box">

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e)=>setConfirm(e.target.value)}
              required
            />


            <span
              className="eye-icon"
              onClick={()=>setShowConfirm(!showConfirm)}
            >
              {
                showConfirm 
                ? <FaEyeSlash/>
                : <FaEye/>
              }
            </span>

          </div>



          <button type="submit">
            Change Password
          </button>


        </form>

      </div>

    </div>
  );
}


export default ResetPassword;