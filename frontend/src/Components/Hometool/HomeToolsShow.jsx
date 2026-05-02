import { Link } from "react-router-dom";
import "./hometools.css";

export default function HomeToolsshow() {
  const tools = [
    {
      title: "Room Size Calculator",
      desc: "Calculate room area instantly",
      icon: "📏",
      path: "/tools/room-calculator",
    },
    {
      title: "Color Palette Generator",
      desc: "Generate modern home color schemes",
      icon: "🎨",
      path: "/tools/color-palette",
    },
    {
      title: "Furniture Planner",
      desc: "Design your room layout easily",
      icon: "🪑",
      path: "/tools/furniture-planner",
    },
    {
      title: "Wallpaper Estimator",
      desc: "Calculate wallpaper requirements",
      icon: "🧱",
      path: "/tools/wallpaper-calculator",
    },
  ];

  return (
    <div className="home-tools-section">

      {/* HEADER */}
      <div className="home-tools-header">
        <h2 className="home-tools-title">Free Home Decor Tools</h2>
        <p className="home-tools-subtitle">
          Design your home smarter with our powerful tools
        </p>
      </div>

      {/* CARDS */}
      <div className="home-tools-grid">
        {tools.map((tool, index) => (
          <Link to={tool.path} className="home-tool-card" key={index}>

            <div className="home-tool-icon">{tool.icon}</div>

            <h3 className="home-tool-name">{tool.title}</h3>

            <p className="home-tool-desc">{tool.desc}</p>

            <div className="home-tool-cta">Try Now →</div>

          </Link>
        ))}
      </div>

    </div>
  );
}