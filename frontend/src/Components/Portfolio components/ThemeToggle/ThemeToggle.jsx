import React, { useState, useEffect } from "react";
import "./ThemeToggle.css";

function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) {
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.color = "#ffffff";
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
    }

    document.body.style.transition = "all 0.3s ease";
  }, [dark]);

  return (
    <div className="theme-toggle">
      <input
        type="checkbox"
        id="theme-switch"
        checked={dark}
        onChange={() => setDark((prev) => !prev)}
      />

      <label htmlFor="theme-switch" className="toggle">
        <span className="icontheme sun">☀️</span>
        <span className="icontheme moon">🌙</span>
      </label>
    </div>
  );
}

export default ThemeToggle;