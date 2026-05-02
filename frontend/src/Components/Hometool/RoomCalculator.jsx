import { useState } from "react";
import "./tools.css";
import Navbar from "../Minicompo/Navbar/Navbar";
import Footer from "../Footer/Footer";

export function RoomCalculator() {
  const [l, setL] = useState("");
  const [w, setW] = useState("");
  const [area, setArea] = useState(null);

  const calc = () => setArea((l * w).toFixed(2));

  return (
    <>
    <Navbar/>
     <div className="pagecard">

    <div className="card">
      <h2>Room Size Calculator</h2>

      <input className="input" placeholder="Length (ft)" value={l} onChange={(e) => setL(e.target.value)} />
      <input className="input" placeholder="Width (ft)" value={w} onChange={(e) => setW(e.target.value)} />

      <button className="button" onClick={calc}>Calculate</button>

      {area && <p>Area: {area} sq ft</p>}
    </div>
     </div>
    <Footer/>
    </>
  );
}