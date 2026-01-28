import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import adminAxios from "../api/adminAxios";
import "../styles/posts.css";
import { toast } from "react-toastify/unstyled";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await adminAxios.get("/posts/getallposts");
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      toast.error("Fetch posts error:", err);
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await adminAxios.delete(`/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
        toast.info("Deleting Post successfully")
    } catch (err) {
      toast.error("Delete error:", err);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="loading">Loading posts...</p>;

  return (
    <div className="admin-posts">
      {/* Header */}
      <div className="page-header">
        <h1>📝Posts</h1>
        <Link to="/admin/posts/create" className="btn primary">
          + New Post✏️
        </Link>
      </div>

      {/* Search */}
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="posts-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post._id}>
                <td><img src={post.image} alt={post.title} className="adminimg"/></td>
                <td>{post.title}</td>
                <td>{post.author?.name || "Admin"}</td>
                <td>
                  <span
                    className={`status ${
                      post.status === "published" ? "published" : "draft"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td>
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="actions">
                  <Link
                    to={`/admin/posts/edit/${post._id}`}
                    className="edit"
                  >
                    Edit
                  </Link>
                  <button
                    className="delete"
                    onClick={() => deletePost(post._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPosts.length === 0 && (
          <p className="empty">No posts found.</p>
        )}
      </div>
    </div>
  );
}
