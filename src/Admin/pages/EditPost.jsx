import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm.jsx";
import adminAxios from "../api/adminAxios.js";

export default function EditPost() {
  const { id } = useParams(); // get post id from URL
  const navigate = useNavigate();

  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch post by ID when component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await adminAxios.get(`/posts/${id}`);
        setPostData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Handle submit (update)
  const handleUpdate = async (form) => {
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) data.append(key, value);
      });

      await adminAxios.put(`/posts/${id}`, data);
      navigate("/admin/posts"); // go back to post list
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (loading) return <p>Loading post data...</p>;
  if (!postData) return <p>Post not found.</p>;

  return <PostForm initialData={postData} onSubmit={handleUpdate} />;
}
