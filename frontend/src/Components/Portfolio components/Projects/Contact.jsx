import React, { useState } from "react";
import "./Contact.css";

import userAxios from "../../../utils/userAxios";


import useGsapReveal from "../../../hooks/useGsapReveal";

function Contact() {
  useGsapReveal('input')
const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await userAxios.post("/contact/", formData);
      setStatus(res.data.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <h2 className="section-title">Contact Me</h2>

      <form onSubmit={handleSubmit} className="contact-form">
        <input type="text" name="name" placeholder="Your Name" required value={formData.name}
            onChange={handleChange} />
        <input type="email" name="email" placeholder="Your Email" value={formData.email}
            onChange={handleChange} required />
             <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        <textarea name="message" placeholder="Your Message" required  value={formData.message}
            onChange={handleChange} />

        <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && <p className="status">{status}</p>}
      </form>
      
    </section>
  );
}

export default Contact;