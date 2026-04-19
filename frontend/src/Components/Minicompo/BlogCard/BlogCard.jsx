import { useEffect, useState } from "react";
import "./BlogCard.css";
import { Link } from "react-router-dom";
import userAxios from "../../../utils/userAxios";

const BlogCard = ({}) => {
  const [Posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(12);
  const fetchPosts = async () => {
    try {
      const res = await userAxios.get("/posts/getallposts");
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch posts error:", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 12);
  };
  if (loading) return <p className="loading">Loading posts...</p>;
  return (
    <>
      <div className="blogcard">
        <div className="blogwrap">
          {Posts.slice(0, visibleCount).map((post) => (
            <Link
              to={`posts/${post._id}/open/live/homedecorim/${post.slug}`}
              className="a"
              key={post._id}
            >
              <div
                className="blog"
                style={{
                  backgroundImage: `url(${post.image})`,
                }}
              >
                <div className="bloghover">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="darkgreen"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19 11.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08"
                    />
                  </svg>
                </div>
                <div className="contentblog">
                  <div className="h2blog">{post.title.slice(0, 80)}</div>
                  <span className="blogcate">{post.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {visibleCount < Posts.length && (
          <div className="show-more-container">
            <Link to={"/blogs"}>
              <button className="show-more-btn" onClick={handleShowMore}>
                Show more →
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogCard;
