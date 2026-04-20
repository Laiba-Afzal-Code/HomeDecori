import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import "./latestCard.css";
import cleanText from "../../utils/cleanText.js";

export default function LatestCard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await axios.get(`/posts/latest`);
        setPosts(res.data.posts || res.data);
      } catch (error) {
        console.error("Failed to fetch latest posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <section className="horizontal-posts-section">
      <h2 className="horizontal-posts-section__title">Latest Posts</h2>

      {loading ? (
        <div className="horizontal-posts-skeleton">
          {[...Array(6)].map((_, i) => (
            <div className="horizontal-skeleton-card" key={i}></div>
          ))}
        </div>
      ) : (
        <div className="horizontal-posts-grid">
          {posts.map((post) => (
            <Link
              to={`/posts/${post._id}/open/live/homedecorim/${post.slug}`}
              key={post._id}
              className="horizontal-post-card"
            >
              <img
                src={post.image}
                alt={post.title}
                className="horizontal-post-card__image"
              />
              <div className="horizontal-post-card__content">
                <div className="horizontal-post-card__meta">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>{post.category}</span>
                </div>
                <h3 className="horizontal-post-card__title">
                  {post.title}...
                </h3>
                {/* Optional excerpt */}
                <p  className="horizontal-post-card__excerpt">{cleanText(post.content).slice(0, 160)}...</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
