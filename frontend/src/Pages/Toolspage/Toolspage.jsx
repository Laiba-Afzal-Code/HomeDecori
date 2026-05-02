import { Link } from "react-router-dom";
import "./toolsPage.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Minicompo/Navbar/Navbar";
import EditorHeroSection from "../../Components/EditorFeatureCard/EditorHeroSection";

export default function ToolsPage() {
  const tools = [
    {
      title: "Room Size Calculator",
      desc: "Measure your room area instantly for planning furniture & decor",
      icon: "📏",
      path: "/tools/room-calculator",
      tag: "Most Used",
    },
    {
      title: "Color Palette Generator",
      desc: "Create aesthetic home color combinations in seconds",
      icon: "🎨",
      path: "/tools/color-palette",
      tag: "Trending",
    },
    {
      title: "Furniture Planner",
      desc: "Visually design your room layout before buying furniture",
      icon: "🪑",
      path: "/tools/furniture-planner",
      tag: "New",
    },
    {
      title: "Wallpaper Estimator",
      desc: "Calculate exactly how many wallpaper rolls you need",
      icon: "🧱",
      path: "/tools/wallpaper-calculator",
      tag: "Popular",
    },
    {
      title: "Budget Planner",
      desc: "Plan your home decor budget smartly and avoid overspending",
      icon: "💰",
      path: "/tools/budget-calculator",
      tag: "Smart Tool",
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="tools-page">

      {/* HERO */}
      <div className="tools-hero">
        <h1 className="tools-title">Free HomeDecorim Tools</h1>
        <p className="tools-subtitle">
          Design, plan, and upgrade your home with smart free tools
        </p>

        <div className="tools-search-note">
          ⚡ No signup required • Instant results • 100% free tools
        </div>
      </div>

      {/* GRID */}
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <Link to={tool.path} className="tool-card" key={index}>

            <div className="tool-top">
              <span className="tool-tag">{tool.tag}</span>
              <span className="tool-icon">{tool.icon}</span>
            </div>

            <h3 className="tool-name">{tool.title}</h3>
            <p className="tool-desc">{tool.desc}</p>

            <div className="tool-footer">
              <span className="tool-cta">Use Tool →</span>
            </div>

          </Link>
        ))}
      </div>
<EditorHeroSection/>

      {/* SEO CONTENT BLOCK (VERY IMPORTANT) */}
      <div className="tools-seo">
        <h2>Why Use HomeDecorim Tools?</h2>
        <p>
          HomeDecorim tools help you design your home smarter. From calculating room size
          to planning furniture layout and choosing color palettes, these tools are built
          for homeowners, renters, and interior design lovers who want fast and accurate results.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
}