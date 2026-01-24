import PostForm from "../components/PostForm";
import adminAxios from "../api/adminAxios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      await adminAxios.post("/posts/createpost", data);
      navigate("/admin/posts");
    } catch (err) {
      console.error("Create post error:", err);
    }
  };

  return <PostForm onSubmit={handleSubmit} />;
}
