import React, { useState } from "react";
import axios from "../../utils/userAxios.js";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "./blogrequest.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Minicompo/Navbar/Navbar";
import { toast } from "react-toastify";
import LatestCard from "../../Components/PostCard/LatestCard.jsx";
import { ButtonLoader, PageLoader } from "../../utils/loading.jsx";

export default function BlogRequest() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const calculateReadingTime = (text) => {
    const words = text.split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("readingTime", calculateReadingTime(content));
setLoading(true)
    try {
      await axios.post("/blog/submit", formData);

      toast.success("Blog submitted for admin review!");
    } catch (err) {
      toast.error(err);
    }finally{
      setLoading(false);

    }
  };
  //  /* LOADING */
  // if (loading) {
  //   return (
  //     <>
  //       <ButtonLoader />
  //     </>
  //   );
  // }

  return (
    <>
      <Navbar />
      <div className="editorPage">
        <div className="editorCard">
          <h2 className="h2">Create Blog Post</h2>

          <form onSubmit={handleSubmit} className="formblog">
            <input
              className="inputblog"
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <select
              className="selectblog"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option>Interior</option>
              <option>Home Decor</option>
              <option>Furniture</option>
              <option>Tips</option>
            </select>

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              className="inputblog"
              onChange={(e) => setTags(e.target.value)}
            />

            <input type="file" onChange={handleImage} />

            {preview && (
              <img src={preview} className="imagePreview" alt="preview" />
            )}

            <SimpleMDE value={content} onChange={setContent} />

            <p className="readingTime">
              Reading Time: {calculateReadingTime(content)} min
            </p>

            <button type="submit" className="publishBtn" disabled={loading}>
              {loading ? <ButtonLoader /> : "Submit Blog"}
            </button>
          </form>
        </div>
      </div>
      <LatestCard />
      <Footer />
    </>
  );
}
