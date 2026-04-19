import { useEffect, useState, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import userAxios from "../../utils/userAxios.js";

import Navbar from "../Minicompo/Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import LatestPostsSidebar from "../Minicompo/LatestPostsSidebar/LatestPostsSidebar.jsx";
import { calculateReadingTime } from "../../utils/readingTime.js";
import "./Blogopen.css";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "../../utils/loading.jsx";
import LatestCard from "../PostCard/LatestCard.jsx";
import CardBlog from "../Minicompo/BlogCard/CardBlog.jsx";
import PostCard from "../PostCard/PostCard.jsx";
import EditorHeroSection from "../EditorFeatureCard/EditorHeroSection.jsx"

export default function BlogOpen() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const readTime = calculateReadingTime(post);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const { data } = await userAxios.get("/categories/", {});
      setCategories(data);
    } catch (err) {
      console.error(
        "Fetch categories error:",
        err.response?.data?.message || err.message,
      );
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  /* FETCH POST */
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await userAxios.get(`/posts/${id}`);
        setPost(res.data);
         console.log(res.data)
      } catch (err) {
        console.error("Failed to load post", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  /* FETCH COMMENTS */
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await userAxios.get(`/comment/post/${id}`);
        setComments(Array.isArray(res.data) ? res.data : []);
       
      } catch (err) {
        console.error("Failed to load comments", err);
      }
    };

    fetchComments();
  }, [id]);

  /* COMMENT TREE MAP */
  const commentMap = useMemo(() => {
    return comments.reduce((acc, c) => {
      const key = c.parentId || "root";
      acc[key] = acc[key] || [];
      acc[key].push(c);
      return acc;
    }, {});
  }, [comments]);

  /* ADD / EDIT COMMENT */
  // const submitComment = async (e) => {
  //   e.preventDefault();
  //   if (!text.trim()) return;

  //   try {
  //     if (editId) {
  //       const res = await userAxios.put(`/comment/${editId}`, { text });
  //       setComments((prev) =>
  //         prev.map((c) => (c._id === editId ? res.data : c)),
  //       );
  //       setEditId(null);
  //     } else {
  //       const res = await userAxios.post("/comment", {
  //         postId: id,
  //         text,
  //         parentId: replyTo,
  //       });
  //       setComments((prev) => [...prev, res.data]);
  //     }
  //   } catch (err) {
  //     console.error("Comment submit failed", err);
  //   } finally {
  //     setText("");
  //     setReplyTo(null);
  //   }
  // };

  const submitComment = async (e) => {
    e.preventDefault();

    // 🚫 Not logged in → redirect to login
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", {
        state: { from: `/post/${id}` }, // optional: redirect back after login
      });
      return;
    }

    if (!text.trim()) return;

    try {
      if (editId) {
        const res = await userAxios.put(`/comment/${editId}`, { text });
        setComments((prev) =>
          prev.map((c) => (c._id === editId ? res.data : c)),
        );
        setEditId(null);
      } else {
        const res = await userAxios.post("/comment", {
          postId: id,
          text,
          parentId: replyTo,
        });
        setComments((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error("Comment submit failed", err);
    } finally {
      setText("");
      setReplyTo(null);
    }
  };

  /* DELETE COMMENT */
  const deleteComment = async (cid) => {
    try {
      await userAxios.delete(`/comment/${cid}`);
      setComments((prev) => prev.filter((c) => c._id !== cid));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /* RENDER COMMENTS */
  const renderComments = (parentId = "root") =>
    commentMap[parentId]?.map((c) => (
      <div className="commentBox" key={c._id}>
        <div className="commentAvatar">{c.username?.[0]}</div>

        <div className="commentBody">
          <strong>{c.username}</strong>
          <p>{c.text}</p>

          <div className="commentActions">
            <span onClick={() => setReplyTo(c._id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M573 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40m-280 0c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40"
                />
                <path
                  fill="currentColor"
                  d="M894 345c-48.1-66-115.3-110.1-189-130v.1c-17.1-19-36.4-36.5-58-52.1c-163.7-119-393.5-82.7-513 81c-96.3 133-92.2 311.9 6 439l.8 132.6c0 3.2.5 6.4 1.5 9.4c5.3 16.9 23.3 26.2 40.1 20.9L309 806c33.5 11.9 68.1 18.7 102.5 20.6l-.5.4c89.1 64.9 205.9 84.4 313 49l127.1 41.4c3.2 1 6.5 1.6 9.9 1.6c17.7 0 32-14.3 32-32V753c88.1-119.6 90.4-284.9 1-408M323 735l-12-5l-99 31l-1-104l-8-9c-84.6-103.2-90.2-251.9-11-361c96.4-132.2 281.2-161.4 413-66c132.2 96.1 161.5 280.6 66 412c-80.1 109.9-223.5 150.5-348 102m505-17l-8 10l1 104l-98-33l-12 5c-56 20.8-115.7 22.5-171 7l-.2-.1C613.7 788.2 680.7 742.2 729 676c76.4-105.3 88.8-237.6 44.4-350.4l.6.4c23 16.5 44.1 37.1 62 62c72.6 99.6 68.5 235.2-8 330"
                />
                <path
                  fill="currentColor"
                  d="M433 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40"
                />
              </svg>
            </span>
            <span
              onClick={() => {
                setEditId(c._id);
                setText(c.text);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m21.71 4.72l-2.43-2.43a1 1 0 0 0-1.41 0l-5.58 5.58a1 1 0 0 0-.29.71V11a1 1 0 0 0 1 1h2.42a1 1 0 0 0 .71-.29l5.58-5.58a1 1 0 0 0 0-1.41M15 10h-1V9l4.58-4.58l1 1Zm4 2a1 1 0 0 0-1 1a7 7 0 0 1-7 7H5.41l.64-.63a1 1 0 0 0 0-1.42A7 7 0 0 1 11 6a1 1 0 0 0 0-2a9 9 0 0 0-7 14.62l-1.71 1.67a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 22h8a9 9 0 0 0 9-9a1 1 0 0 0-1-1"
                />
              </svg>
            </span>
            <span onClick={() => deleteComment(c._id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z"
                  stroke-width="0.5"
                  stroke="currentColor"
                />
              </svg>
            </span>
          </div>

          <div className="reply">{renderComments(c._id)}</div>
        </div>
      </div>
    ));

  /* LOADING */
  if (loading) {
    return (
      <>
        <PageLoader />
      </>
    );
  }

  if (!post) return null;

  return (
    <>
      <Navbar />

      <div className="blogOpenPage">
        {/* MAIN CONTENT */}
        <main className="blogMain">
          <Link to={`/category/${post.category}`} className="a">
            <p className="category">{post.category}</p>
          </Link>
          <h1 className="blogTitle">{post.title}</h1>

          <div className="metablog">
            <p className="blogMeta">
              By •
              <Link to={`/author/${post.author._id}`} className="a">
                Decorim-Author
              </Link>
              • {new Date(post.createdAt).toDateString()}
            </p>
            <div className="metablog">
              <p className="blogMeta">
                <div className="comenticon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" stroke="gray" strokeWidth="2" />
                  <path
                    d="M12 7v6l4 2"
                    stroke="gray"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="commentslength">
                  {calculateReadingTime(post?.content)}
                </p>
                </div>

                <div className="comenticon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      fill="currentColor"
                      d="M573 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40m-280 0c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40"
                    />
                    <path
                      fill="currentColor"
                      d="M894 345c-48.1-66-115.3-110.1-189-130v.1c-17.1-19-36.4-36.5-58-52.1c-163.7-119-393.5-82.7-513 81c-96.3 133-92.2 311.9 6 439l.8 132.6c0 3.2.5 6.4 1.5 9.4c5.3 16.9 23.3 26.2 40.1 20.9L309 806c33.5 11.9 68.1 18.7 102.5 20.6l-.5.4c89.1 64.9 205.9 84.4 313 49l127.1 41.4c3.2 1 6.5 1.6 9.9 1.6c17.7 0 32-14.3 32-32V753c88.1-119.6 90.4-284.9 1-408M323 735l-12-5l-99 31l-1-104l-8-9c-84.6-103.2-90.2-251.9-11-361c96.4-132.2 281.2-161.4 413-66c132.2 96.1 161.5 280.6 66 412c-80.1 109.9-223.5 150.5-348 102m505-17l-8 10l1 104l-98-33l-12 5c-56 20.8-115.7 22.5-171 7l-.2-.1C613.7 788.2 680.7 742.2 729 676c76.4-105.3 88.8-237.6 44.4-350.4l.6.4c23 16.5 44.1 37.1 62 62c72.6 99.6 68.5 235.2-8 330"
                    />
                    <path
                      fill="currentColor"
                      d="M433 421c-23.1 0-41 17.9-41 40s17.9 40 41 40c21.1 0 39-17.9 39-40s-17.9-40-39-40"
                    />
                  </svg>
                  <p className="commentslength">{comments.length}</p>
                </div>
              </p>
              <span className="blogMeta"></span>
            </div>
          </div>

          <img src={post.image} alt={post.title} className="blogImg" />

          <div
            className="blogDesc"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* COMMENTS */}
          <h3 className="commentCount">{comments.length} Comments</h3>
          {renderComments()}

          {/* COMMENT FORM */}
          <form className="commentForm" onSubmit={submitComment}>
            <textarea
              placeholder={replyTo ? "Reply..." : "Write a comment..."}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">{editId ? "Update" : "Post"}</button>
          </form>
          <CardBlog/>
          <EditorHeroSection/>
        </main>

        {/* SIDEBAR */}
        <aside className="blogSidebar">
          <div className="sidebarBox">
            <h3>Categories</h3>
            {Categories.map((c) => (
              <ul key={c._id}>
                <Link to={`/category/${c.slug}`} className="a">
                  <li className="cate">{c.name}</li>
                </Link>
              </ul>
            ))}
          </div>

          <LatestPostsSidebar />
        </aside>
      </div>

      <Footer />
    </>
  );
}
