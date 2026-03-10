import { Link } from "react-router-dom";
import "./BlogCard.css";
import { useEffect, useState } from "react";
import userAxios from "../../../utils/userAxios";

const Catenavbar = () => {
  const [Category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPosts = async () => {
    try {
      const res = await userAxios.get("/categories/");
      setCategory(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch posts error:", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p className="loading">Loading posts...</p>;
  return (
    <>
      <div className="catenav">
        <h1 className="catenavh">Our Decorim</h1>
        <div className="navcat">
          <ul className="catenavul">
            <Link to={"/blogs"} className="cateli">
              <li className="cateli active">All</li>
            </Link>
            {Category.map((cat) => (
              <Link to={`/category/${cat.slug}`} className="cateli"  key={cat._id}>
                <li className="cateli"> {cat.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      
      </div>
    </>
  );
};

export default Catenavbar;
