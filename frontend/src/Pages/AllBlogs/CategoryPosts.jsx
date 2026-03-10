import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userAxios from "../../utils/userAxios";
import { Link } from "react-router-dom";
import "./blogs.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Minicompo/Navbar/Navbar";
import cleanText from "../../utils/cleanText";

const CategoryPosts = () => {
  const { category } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryPosts = async () => {
      try {
        const { data } = await userAxios.get(`/posts/category/${category}`);
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryPosts();
  }, [category]);

  if (loading) return <div className="loader" />;

  return (
    <>
    <Navbar/>
    <div className="blogs-page">
      <h1 className="page-title">{category} Blogs</h1>

      <div className="blogs-grid">
        {posts.map((post) => (
          <div className="blog-card" key={post._id}>
            <div
              className="blog-img"
              style={{ backgroundImage: `url(${post.image})` }}
            />

            <div className="blog-content">
              <h2>{post.title}</h2>

              <p>
               {cleanText(post.content).slice(0, 50)}...
              </p>

              <Link
                to={`/posts/${post._id}/open/live/homedecorim/${post.slug}`}
                className="read-btn"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CategoryPosts;
