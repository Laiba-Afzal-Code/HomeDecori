import "./home.css";
import Hero from "../Components/hero/Hero";
import Catenavbar from "../Components/Minicompo/BlogCard/Catenavbar";
import PostCard from "../Components/PostCard/POstCard";
import BlogCard from "../Components/Minicompo/BlogCard/BlogCard";
import Newsletter from "../Components/Footer/Newsletter";
import Footer from "../Components/Footer/Footer";
import { useEffect, useState } from "react";
import Navbar from "../Components/Minicompo/Navbar/Navbar.jsx";
import Testimonials from "../Components/Testimonial/Testimonial.jsx";
import Services from "../Components/Services/Services.jsx";
import CardBlog from "../Components/Minicompo/BlogCard/CardBlog.jsx";
import LatestCard from "../Components/PostCard/LatestCard.jsx";
import HomeCategoryShowcase from "./HomeCategoryShowcase/HomeCategoryShowcase.jsx";
import EditorHeroSection from "../Components/EditorFeatureCard/EditorHeroSection.jsx";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    document.title = "HomeDecorIM – Modern Home & Interior Blog";
  }, []);

  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="home">
        <Hero />
        <Catenavbar />
        <BlogCard />
        <PostCard />
        <EditorHeroSection/>
        <Testimonials />
        <HomeCategoryShowcase/>
        <CardBlog />
        <LatestCard />
        <Services />
        <Footer />
      </div>
    </>
  );
};

export default Home;
