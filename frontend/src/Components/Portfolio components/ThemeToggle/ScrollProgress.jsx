import React, { useEffect, useState } from "react";

function ScrollProgress() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = (window.scrollY / total) * 100;
      setScroll(progress);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  return <div style={{ width: `${scroll}%`, height: "4px", background: "#0bc63a", position: "fixed", top: 0, left: 0, zIndex: 9999 }} />;
}

export default ScrollProgress;