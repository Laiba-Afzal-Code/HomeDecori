import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import "./latestPostsSidebar.css";
import { Link } from "react-router-dom";
import cleanText from "../../../utils/cleanText.js";
export default function LatestPostsSidebar() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await axios.get(`/posts/latest`);
        setPosts(res.data.posts || res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch latest posts", error);
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <aside className="latest-sidebar">
      <h3 className="sidebar-title">Latest Posts</h3>

      {loading ? (
        <div className="sidebar-skeleton">
          {[...Array(5)].map((_, i) => (
            <div className="skeleton-item" key={i}></div>
          ))}
        </div>
      ) : (
        <ul className="latest-post-list">
          {posts.map((post) => (
            <li key={post._id} className="latest-post-item">
              <Link
                to={`/posts/${post._id}/open/live/homedecorim/${post.slug}`}
                className="a"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="latest-post-img"
                />
                <div className="latest-post-content">
                  <h4>{post.title.slice(0, 100)}...</h4>
                  {/* <p className="p">{cleanText(post.content).slice(0, 30)}...</p> */}

                  <div className="cated">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>{post.category}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
