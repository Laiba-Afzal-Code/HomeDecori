import { useEffect, useState } from "react";
import axios from "../../utils/userAxios";
import "./HomeCategoryShowcase.css";
import { Link, useParams } from "react-router-dom";
import cleanText from "../../utils/cleanText";
import { toast } from "react-toastify";

export default function HomeCategoryShowcase() {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState({});
  const { category } = useParams();

  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get("/categories/");
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!categories.length) return;

      for (const cat of categories) {
        // Skip if already fetched
        if (posts[cat.slug]) continue;

        try {
          const { data } = await axios.get(
            `/posts/category/${cat.slug}?limit=5`,
          );

          setPosts((prev) => ({
            ...prev,
            [cat.slug]: data,
          }));
        } catch (err) {
          toast.error("Error fetching posts for category", cat.name, err);
        }
      }
    };

    fetchPosts();
  }, [categories]);

  //   if (loading) return <div className="loader" />;
  return (
    <div className="home-categories">
      {categories.map((cat) => (
        <section key={cat._id} className="category-section">
          {/* Category Heading */}
          <div className="category-header">
            <h2>{cat.name}</h2>
            <a href={`/category/${cat.slug}`}>View All</a>
          </div>
          <div className="category-posts"></div>
          {/* Category Posts */}
          <div className="category-posts">
            {posts[cat.slug] && posts[cat.slug].length > 0 ? (
              posts[cat.slug].map((post, index) => (
                <Link
                  to={`/posts/${post._id}/open/live/homedecorim/${post.slug}`}
                  className="a"
                >
                  <article
                    key={post._id}
                    className={`post-card ${index === 0 ? "featured" : ""}`}
                  >
                    <img src={post.image} alt={post.title} />
                    <div className="post-content">
                      <h3 className="catehead">{post.title}</h3>
                      <p>{cleanText(post.content).slice(0, 50)}...</p>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
