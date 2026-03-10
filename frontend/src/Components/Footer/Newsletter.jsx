import { useState } from "react";
import userAxios from "../../utils/userAxios";
import "./newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const { data } = await userAxios.post("/categories/newsletter", {
        email,
      });

      setStatus(data.message || "Successfully subscribed!");
      setEmail("");
    } catch (error) {
      setStatus(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter">
      <h2 className="h2blog">Subscribe to Our Newsletter</h2>
      <p className="pblog">Get the latest blogs and updates directly in your inbox.</p>

      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {status && <p className="message">{status}</p>}
    </section>
  );
};

export default Newsletter;
