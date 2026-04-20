import React from "react";
import "./services.css";
import { FaPaintRoller, FaLightbulb, FaHome, FaPenNib } from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaHome />,
    title: "Home Décor Ideas",
    desc: "Inspiring décor ideas to transform your living spaces with style and comfort.",
  },
  {
    id: 2,
    icon: <FaPaintRoller />,
    title: "Interior Styling",
    desc: "Expert styling tips for modern, minimal, and luxury interior designs.",
  },
  {
    id: 3,
    icon: <FaLightbulb />,
    title: "DIY & Smart Tips",
    desc: "Easy DIY décor hacks and smart solutions for beautiful homes.",
  },
  {
    id: 4,
    icon: <FaPenNib />,
    title: "Text Editing Tool",
    desc: "A powerful yet easy-to-use text editor built for speed and style all in one place.",
  },

];

export default function Services() {
  return (
    <section className="service-section">
      <h2 className="service-heading">What We Provide</h2>

      <div className="service-grid">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <div className="service-icon">{service.icon}</div>
            <h3 className="h3service">{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
