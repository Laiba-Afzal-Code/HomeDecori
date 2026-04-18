import { useState } from "react";
import { createAdmin } from "../../utils/authService.js";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateAdmin() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    secret: "",
  });
   const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await createAdmin(form);
      setMessage("Admin created successfully");
      toast.info("Admin Created Successfully")
       navigate("/admin");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create admin");
    }
  };

  return (
    <div className="auth-container">
     
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Admin</h2>

        {message && <div className="auth-info">{message}</div>}

        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} />
        <input name="secret" placeholder="Admin Secret" onChange={handleChange} />

        <button>Create Admin</button>
      </form>
    </div>
  );
}