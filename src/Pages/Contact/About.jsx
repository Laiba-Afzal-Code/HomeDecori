import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Minicompo/Navbar/Navbar";
import "./About.css";

const About = () => {
  return (
    <>
    <Navbar/>
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <h1>About HomeDecorim</h1>
        <p>
          Inspiring modern living through thoughtful design, creative spaces,
          and digital storytelling.
        </p>
      </section>

      {/* ABOUT CONTENT */}
      <section className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            HomeDecorim is a design-focused blog and creative platform dedicated
            to home styling, interior inspiration, and modern decor trends.
            We help homeowners, designers, and brands create meaningful spaces
            that reflect lifestyle and personality.
          </p>
        </div>

        <div className="about-text">
          <h2>What We Do</h2>
          <p>
            Beyond blogging, we operate as a creative advertising agency,
            delivering digital branding, social media growth, and visual
            marketing solutions for decor brands, startups, and creators.
          </p>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="about-cards">
        <div className="about-card">
          <h3>🏠 Home Decor Blog</h3>
          <p>
            Curated content covering interior design trends, DIY ideas,
            space planning, and modern living inspiration.
          </p>
        </div>

        <div className="about-card">
          <h3>📢 Advertising Agency</h3>
          <p>
            We create brand strategies, ad creatives, and digital campaigns
            that connect decor brands with the right audience.
          </p>
        </div>

        <div className="about-card">
          <h3>📱 Social Media Growth</h3>
          <p>
            Professional social media management, content creation,
            and audience engagement for lifestyle and decor brands.
          </p>
        </div>
      </section>

      {/* SOCIAL PRESENCE */}
      <section className="about-social">
        <h2>Our Digital Presence</h2>
        <p>
          We actively share ideas, visuals, and insights across social platforms
          to inspire design-driven communities.
        </p>

        <div className="social-links">
          <a href="https://www.facebook.com/profile.php?id=61574048553119" target="_blank" rel="noreferrer" >Instagram</a>
          <a href="https://www.instagram.com/newscovry/" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://www.linkedin.com/company/newscovry/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </section>

    </div>
    <Footer/>
    </>
  );
};

export default About;
