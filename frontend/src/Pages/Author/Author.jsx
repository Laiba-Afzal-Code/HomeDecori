import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import userAxios from "../../utils/userAxios";
import "./author.css";
import Navbar from "../../Components/Minicompo/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import cleanText from "../../utils/cleanText";

const AuthorPage = () => {
  const { authorId } = useParams();
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorPosts = async () => {
      try {
        const res = await userAxios.get(`/posts/author/${authorId}`);
        setPosts(res.data);
        setAuthor(res.data[0]?.author);
      } catch (error) {
        console.error("Failed to load author posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorPosts();
  }, [authorId]);

  if (loading) return <div className="loader" />;

  return (
    <>
    <Navbar/>
    <div className="author-page">
      {/* Author Header */}
      <div className="author-header">
        <div className="author-avatar">
          {author?.name?.charAt(0)}
        </div>
        <div>
          <h1 className="author-name">{author?.name}</h1>
          <p className="author-meta">
            {posts.length} Articles Published
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="author-posts">
        {posts.map((post) => (
          <div className="author-card" key={post._id}>
            <div
              className="author-image"
              style={{ backgroundImage: `url(${post.image})` }}
            />

            <div className="author-content">
              <p className="author-category">{post.category}</p>
              <h2>{post.title}</h2>
              <p className="author-excerpt">
               {cleanText(post.content).slice(0, 50)}...
              </p>

              <Link
                to={`/posts/${post._id}/open/live/homedecorim/${post.slug}`}
                className="read-more"
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

export default AuthorPage;
