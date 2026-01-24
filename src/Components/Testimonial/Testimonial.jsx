import React from "react";
import "./testimonial.css";

const testimonials = [
  {
    id: 1,
    name: "Ayesha Khan",
    role: "Interior Blogger",
    text: "HomeDecorim has completely transformed the way I design spaces. The ideas are elegant, modern, and very practical.",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 2,
    name: "Sara Malik",
    role: "Home Stylist",
    text: "I love how detailed and inspiring the blog is. Every post feels thoughtfully designed and easy to follow.",
    image: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 3,
    name: "Haider Ali",
    role: "DIY Enthusiast",
    text: "The décor tips are amazing! I redesigned my living room just by following HomeDecorim’s guides.",
    image: "https://i.pravatar.cc/150?img=12",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonial-section">
      <h2 className="testimonial-heading">What Our Readers Say</h2>

      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <div className="testimonial-card" key={item.id}>
            <p className="testimonial-text">“{item.text}”</p>

            <div className="testimonial-user">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <span>{item.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
