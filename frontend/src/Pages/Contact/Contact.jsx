import { useState } from "react";
import "./contact.css";
import userAxios from "../../utils/userAxios";
import Navbar from '../../Components/Minicompo/Navbar/Navbar.jsx';
import Footer from '../../Components/Footer/Footer.jsx';
import {
  FaHome,
  FaCouch,
  FaChair,
 
  FaBlogger,
} from "react-icons/fa";
const Contact = () => {
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
    <>
    <Navbar/>
    <div className="contact">
     <div className="floating-icons">
                      <FaCouch className="icon couch" />
                      <FaChair className="icon chair" />
                      <FaHome className="icon homeIcon" />
                       <FaBlogger className="icon blogicon"/>
                    </div>
      <div className="contact-container">
        <h2>Contact Us</h2>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && <p className="status">{status}</p>}
        </form>
      </div>
            </div>
      <Footer/>
    </>
  );
};

export default Contact;
