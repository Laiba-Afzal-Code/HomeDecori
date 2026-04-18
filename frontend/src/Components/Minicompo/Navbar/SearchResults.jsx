import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "../../../utils/userAxios";
import "./Navbar.css";
import Footer from "../../Footer/Footer";
import Navbar from "./Navbar";

export default function SearchResults() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/posts/search?query=${query}`);
        setPosts(data);
      } catch (error) {
        console.error("Search error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <>
      <Navbar />
      <div className="search-results-page">
        <h2>
          Search results for: <span>{query}</span>
        </h2>

        {loading && <p>Searching...</p>}

        {!loading && posts.length === 0 && <p>No results found.</p>}

        <div className="search-results-list">
          {posts.map((post) => (
            <Link
              key={post._id}
              className="search-page-card a"
              to={`/posts/${post._id}/open/live/homedecorim/${post.slug}`}
            >
              <img src={post.image || "/placeholder.jpg"} alt={post.title} />

              <div className="search-card-text">
                <h4>{post.title}</h4>
                <p>{post.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
