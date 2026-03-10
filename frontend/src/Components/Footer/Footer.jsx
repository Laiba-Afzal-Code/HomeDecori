import "./footer.css";
import Newsletter from "./Newsletter";
import imagelogo from "../../assets/homedeorimgreen.svg";
import { Link } from "react-router-dom";
import Topnav from "../Minicompo/topnav/Topnav";
import { useEffect, useState } from "react";
import userAxios from "../../utils/userAxios";
const Footer = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const res = await userAxios.get("/categories/", {
        // headers: { Authorization: `Bearer ${token}` },
      });
      const postsArray = Array.isArray(res.data)
        ? res.data
        : res.data.categories || [];
      setCategories(postsArray);
      console.log("API DATA:", res.data);

      console.log(postsArray);
    } catch (err) {
      console.error(
        "Fetch categories error:",
        err.response?.data?.message || err.message,
      );
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <footer className="hd-footer">
      <div className="hd-footer-container">
        <Newsletter />
        {/* Brand */}
        <div className="hd-footer-brand">
          {/* <h2>HomeDecorim</h2> */}
          <Link to={"/"}>
            <img
              src={imagelogo}
              alt="homedecorim.com decor blog inspiring ideas"
              width={250}
            />
          </Link>
          <p>
            Inspiring modern interiors, elegant spaces, and timeless home décor
            ideas for beautiful living.
          </p>
        </div>

        {/* Explore */}
        <div className="hd-footer-section">
          <h3>Explore</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blogs">Blog</Link>
            </li>
            <li>
              <Link to={`/profile`}>Profile</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/texteditor">Editor Tool</Link>
            </li>
           
             <li>
              <Link to="/afterbeforeview">Ai Room</Link>
            </li>
             <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to={"/write-with-us"}> Write with us</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="hd-footer-section">
          <h3>Decor Styles</h3>
          {categories.length > 0 ? (
            categories.slice(0, 7).map((cat) => (
              <ul>
                <li key={cat.id}>
                  <Link to={`/category/${cat.slug}`} >
                    {cat.name}
                  </Link>
                </li>
              </ul>
            ))
          ) : (
            <p>Preparing</p>
          )}
        </div>

        {/* Categories */}
        <div className="hd-footer-section">
          <h3>Decor Styles</h3>
          {categories.length > 0 ? (
            categories.slice(5).map((cat) => (
              <ul>
                <li>
                  <Link to={`/category/${cat.slug}`} key={cat._id}>
                    {cat.name}
                  </Link>
                </li>
              </ul>
            ))
          ) : (
            <p>Preparing Category</p>
          )}
        </div>
        {/* <div className="email">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 36 36"
          >
            <path
              fill="#132b09"
              d="M32.33 6a2 2 0 0 0-.41 0h-28a2 2 0 0 0-.53.08l14.45 14.39Z"
              class="clr-i-solid clr-i-solid-path-1"
            />
            <path
              fill="#132b09"
              d="m33.81 7.39l-14.56 14.5a2 2 0 0 1-2.82 0L2 7.5a2 2 0 0 0-.07.5v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-.12-.61M5.3 28H3.91v-1.43l7.27-7.21l1.41 1.41Zm26.61 0h-1.4l-7.29-7.23l1.41-1.41l7.27 7.21Z"
              class="clr-i-solid clr-i-solid-path-2"
            />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
         homedecorimlaiba@gmail.com
        </div> */}
      </div>
      {/* Bottom */}
      <Topnav />
      <div className="hd-footer-bottom">
        <p>© {new Date().getFullYear()} HomeDecorim. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
