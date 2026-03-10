import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import axios from "../../../utils/userAxios.js";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  // 🔍 Live search with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `/posts/search?query=${encodeURIComponent(query)}`
        );

        setResults(res.data || []);
        console.log(res.data)
        setShowDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
        setShowDropdown(false);
      }
    };

    const debounceTimer = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  // ✏️ Input handler
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // 🔎 Submit search
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?query=${encodeURIComponent(query)}`);
    setShowDropdown(false);
  };

  return (
    <div className="nav-search">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search Home Decorim..."
          value={query}
          onChange={handleChange}
        />

        <button type="submit" className="search-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <path
                fill="gray"
                d="M19 11a8 8 0 1 1-16 0a8 8 0 0 1 16 0"
                opacity="0.16"
              />
              <path
                stroke="gray"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
              />
            </g>
          </svg>
        </button>
      </form>

      {/* 🔽 Search Results Dropdown */}
      {showDropdown && results.length > 0 && (
        <div className="search-dropdown">
          {results.map((post) => (
            <div
              key={post._id}
              className="search-card"
              onClick={() => {
                navigate(`/posts/${post._id}/open/live/homedecorim/${post.slug}`); 
              }}
            >
              <img
                src={post.image || "/placeholder.jpg"}
                alt={post.title}
              />

              <div className="search-card-text">
                <h4>{post.title}</h4>
                <p>{post.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
