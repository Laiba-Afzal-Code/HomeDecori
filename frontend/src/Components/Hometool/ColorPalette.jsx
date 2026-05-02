import { useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Minicompo/Navbar/Navbar";

export function ColorPalette() {
  const [colors, setColors] = useState([]);

  const generate = () => {
    const newColors = Array.from(
      { length: 5 },
      () => "#" + Math.floor(Math.random() * 16777215).toString(16),
    );
    setColors(newColors);
  };

  return (
    <>
      <Navbar />
      <div className="pagecard">

      <div className="card">
        <h2>Color Palette Generator</h2>

        <button className="button" onClick={generate}>Generate Colors</button>

        <div className="palette">
          {colors.map((c, i) => (
              <div key={i} className="colorBox" style={{ background: c }}>
              {c}
            </div>
          ))}
        </div>
      </div>
          </div>
      <Footer />
    </>
  );
}
