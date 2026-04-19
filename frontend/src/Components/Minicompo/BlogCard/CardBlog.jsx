import { useEffect, useState } from "react";
import axios from "../../../utils/userAxios";
import "./cardBlog.css";
import { Link } from "react-router-dom";

export default function CardBlog() {
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/posts/getallposts");

        // Skip first 6 posts
        const postsAfterSix = data.slice(12);

        setPosts(postsAfterSix);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div>
      <div className="blogcard blogwrap">
        {posts.slice(0, visibleCount).map((post) => (
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

      {visibleCount < posts.length && (
        <div className="show-more-container">
            <Link to={"/blogs"}>
          <button className="show-more-btn" onClick={handleShowMore}>
            Show more →
          </button>
            </Link>
        </div>
      )}
    </div>
  );
}
