import { useEffect, useState } from "react";
import userAxios from "../../utils/userAxios";
import { Link } from "react-router-dom";
import "./blogs.css";
import cleanText from "../../utils/cleanText";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Minicompo/Navbar/Navbar";
import { PageLoader } from "../../utils/loading";

const AllBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await userAxios.get("/posts/getallposts/");
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

 /* LOADING */
  if (loading) {
    return (
      <>
        <PageLoader />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="blogs-page">
        <h1 className="page-title">All Blogs</h1>

        <div className="blogs-grid">
          {posts.map((post) => (
            <div className="blog-card" key={post._id}>
              <div
                className="blog-img"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <Link
                to={`/posts/${post._id}/open/live/homedecorim/${post.slug}`}
                className="a"
              >
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="contentS">
                      {" "}
                      By <strong> {post.author?.name}</strong>
                    </span>
                    <Link
                      to={`/category/${post.category}`}
                      className="blog-category"
                    >
                      {post.category}
                    </Link>
                  </div>
                  <h2 className="cardhead">{post.title}</h2>

                  <p className="pcontent">
                    {cleanText(post.content).slice(0, 150)}...
                  </p>

                  {/* <Link
                to={`/posts/${post._id}/open/live/homedecorim/${post.slug}`}
                className="read-btn"
                >
                Read More →
              </Link> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllBlogs;
