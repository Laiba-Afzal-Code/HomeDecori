import React, { useState } from "react";
import "./naqsha.css"
export default function NaqshaForm({ onGenerate }) {
  const [form, setForm] = useState({
    plotType: "residential",
    width: 25,
    length: 50,
    floors: 2,
    bedrooms: 3,
    bathrooms: 2,
    kitchens: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-card">
      <h2>Enter Plot Details</h2>

      <select name="plotType" onChange={handleChange}>
        <option value="residential">Residential</option>
        <option value="office">Office</option>
        <option value="commercial">Commercial</option>
      </select>

      <input name="width" placeholder="Width" onChange={handleChange} />
      <input name="length" placeholder="Length" onChange={handleChange} />

      <input name="floors" placeholder="Floors" onChange={handleChange} />
      <input name="bedrooms" placeholder="Bedrooms" onChange={handleChange} />
      <input name="bathrooms" placeholder="Bathrooms" onChange={handleChange} />

      <button onClick={() => onGenerate(form)}>
        Generate Naqsha
      </button>
    </div>
  );
}