import React from "react";
import "./testimonial.css";
import girl from '../../assets/girl.jpg'
import Boy from '../../assets/boy.jpg'
import girl2 from '../../assets/girl1.jpg'
import useGsapReveal from '../../hooks/useGsapReveal'
const testimonials = [
  {
    id: 1,
    name: "Ayesha Khan",
    role: "Interior Blogger",
    text: "HomeDecorim has completely transformed the way I design spaces. The ideas are elegant, modern, and very practical.",
    image: girl,
  },
  {
    id: 2,
    name: "Sara Malik",
    role: "Home Stylist",
    text: "I love how detailed and inspiring the blog is. Every post feels thoughtfully designed and easy to follow.",
    image: girl2 ,
  },
  {
    id: 3,
    name: "Haider Ali",
    role: "DIY Enthusiast",
    text: "The décor tips are amazing! I redesigned my living room just by following HomeDecorim’s guides.",
    image: Boy,
  },
];

export default function Testimonials() {
  useGsapReveal('.testimonial-grid')
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
