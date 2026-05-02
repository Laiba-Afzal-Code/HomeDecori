import { useState } from "react";
import "./tools.css";
import Footer from "../Footer/Footer";
import Navbar from "../Minicompo/Navbar/Navbar";

export default function FurniturePlanner() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");

  const addItem = () => {
    if (!name.trim()) return;

    const newItem = {
      id: Date.now(),
      name: name,
    };

    setItems([...items, newItem]);
    setName("");
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="pagecard">
        <div className="card">
          <h2 className="title">Furniture Planner Tool</h2>
          <p className="subtitle">Add furniture and design your room layout</p>

          {/* INPUT */}
          <input
            className="input"
            placeholder="Enter furniture name (e.g. Sofa, Table)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="button" onClick={addItem}>
            Add Furniture
          </button>

          {/* GRID */}
          <div className="grid">
            {items.map((item) => (
              <div className="box furniture-box" key={item.id}>
                <span className="furniture-name">{item.name}</span>
                <button
                  className="buttonSecondary small-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {items.length === 0 && (
            <p className="empty-text">No furniture added yet</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
