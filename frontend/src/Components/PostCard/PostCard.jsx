import { useEffect, useState } from "react";
import "./postcard.css";
import logocard from "../../assets/homeo.svg";
import { Link } from "react-router-dom";
import userAxios from "../../utils/userAxios";
import cleanText from "../../utils/cleanText";

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const interval = 6000;

  // Fetch latest posts
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await userAxios.get("/posts/latest");
        setPosts(res.data.posts || res.data);
      } catch (error) {
        console.error("Failed to fetch latest posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  // Auto slide
  useEffect(() => {
    if (!posts.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % posts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [posts.length]);


  const goToSlide = (index) => setCurrent(index);

  if (loading) return <div className="loader" />;

  if (!posts.length) return null;

  const post = posts[current];

  return (
    <div className="postcard">
      {/* Top Section */}
      <div className="cardtop">
        <h1 className="cardhead">Get Inspiration from Home Decorim</h1>
        <p className="topp">
          Discover modern ideas, expert tips, and inspiring home decor trends.
        </p>
      </div>

      {/* Card */}
      <div className="cardpost">
        {/* Image */}
        <div
          className="carpi"
          style={{
            backgroundImage: post.image ? `url(${post.image})` : "none",
          }}
        >
          <div className="logocard">
            <img src={logocard} alt="Home Decorim" width={100} />
          </div>

          {/* Dots */}
          <div className="dots">
            {posts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={current === index ? "dot active" : "dot"}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="cardcontent">
          <p className="catecard">{post.category}</p>

          <h2 className="cardheadp">{post.title}</h2>

          <p className="p">{cleanText(post.content).slice(0, 100)}...</p>

          <div className="info">
            <span className="author timep">
              by {post.author?.name || "Admin"}
            </span>
            {" - "}
            <span className="timep">{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          <Link
            to={`/posts/${post._id}/open/live/homedecorim/${post.slug}`}
            className="a"
          >
            <button className="cardbtn">
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#e1f340"
                  d="M13.293 7.293a1 1 0 0 0 0 1.414L15.586 11H8a1 1 0 0 0 0 2h7.586l-2.293 2.293a.999.999 0 1 0 1.414 1.414L19.414 12l-4.707-4.707a1 1 0 0 0-1.414 0"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
