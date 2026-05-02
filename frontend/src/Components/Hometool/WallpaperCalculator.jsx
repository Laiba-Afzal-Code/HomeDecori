import { useState } from "react";
import Navbar from "../Minicompo/Navbar/Navbar";
import Footer from "../Footer/Footer";

export function WallpaperCalculator() {
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  const [result, setResult] = useState(null);

  const calc = () => {
    const area = h * w;
    const rolls = Math.ceil(area / 50); // assume 50 sq ft per roll
    setResult(rolls);
  };

  return (
    <>
    <Navbar/>
     <div className="pagecard">

    <div className="card">
      <h2>Wallpaper Estimator</h2>

      <input className="input" placeholder="Height (ft)" onChange={(e) => setH(e.target.value)} />
      <input className="input" placeholder="Width (ft)" onChange={(e) => setW(e.target.value)} />

      <button className="button" onClick={calc}>Estimate</button>

      {result && <p>You need: {result} rolls</p>}
    </div>
     </div>
    <Footer/>
     </>
  );
}