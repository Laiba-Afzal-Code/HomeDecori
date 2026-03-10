import { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "../styles/createpost.css";
import adminAxios from "../api/adminAxios";

export default function PostForm({ initialData = null, onSubmit }) {
  /* -------------------- state -------------------- */
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    tags: "",
    status: "draft",
    backlink: "",
    metaTitle: "",
    metaDesc: "",
    image: null,
  });

  /* -------------------- effects -------------------- */

  // Fetch categories once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await adminAxios.get("/categories/");
        setCategories(data);
      } catch (err) {
        console.error(
          "Fetch categories error:",
          err.response?.data?.message || err.message
        );
      }
    };

    fetchCategories();
  }, []);

  // Populate form in edit mode (once)
  useEffect(() => {
    if (!initialData) return;

    setLoading(true);

    setForm((prev) => ({
      ...prev,
      title: initialData.title || "",
      slug: initialData.slug || "",
      content: initialData.content || "",
      category: initialData.category || "",
      tags: initialData.tags || "",
      status: initialData.status || "draft",
      backlink: initialData.backlink || "",
      metaTitle: initialData.metaTitle || "",
      metaDesc: initialData.metaDesc || "",
      image: null, // no file yet
    }));

    // Only set preview if no new image is selected
    setImagePreview((prev) => prev || initialData.image || "");

    setLoading(false);
  }, [initialData]);

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  /* -------------------- handlers -------------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));

    // Show selected image preview
    setImagePreview(URL.createObjectURL(file));
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  /* -------------------- render -------------------- */

  if (loading) {
    return <p>Loading post data...</p>;
  }

  return (
    <form className="post-form" onSubmit={submitForm}>
      <h2>{initialData ? "Edit Post" : "Create Post"}</h2>

      {/* Title */}
      <input
        name="title"
        placeholder="Post title"
        value={form.title}
        onChange={handleChange}
        required
      />

      {/* Slug */}
      <input
        name="slug"
        placeholder="Slug (seo-friendly-url)"
        value={form.slug}
        onChange={handleChange}
      />

      {/* Image */}
      <div className="image-upload">
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="preview-image" />
        )}
        <input type="file" accept="image/*" onChange={handleImage} />
      </div>

      {/* Category & Status */}
      <div className="grid">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Tags */}
      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
      />

      {/* Content */}
      <ReactQuill
        value={form.content}
        onChange={(value) =>
          setForm((prev) => ({ ...prev, content: value }))
        }
        placeholder="Write your content here..."
        className="text"
      />

      {/* Backlink */}
      <input
        name="backlink"
        placeholder="Source / Backlink URL (optional)"
        value={form.backlink}
        onChange={handleChange}
      />

      {/* SEO */}
      <div className="seo-box">
        <h4>SEO Settings</h4>
        <input
          name="metaTitle"
          placeholder="Meta Title"
          value={form.metaTitle}
          onChange={handleChange}
        />
        <textarea
          name="metaDesc"
          placeholder="Meta Description"
          rows="3"
          value={form.metaDesc}
          onChange={handleChange}
        />
      </div>

      {/* Submit */}
      <button type="submit" className="btn primary">
        {initialData
          ? "Update Post"
          : form.status === "draft"
          ? "Save Draft"
          : "Publish Post"}
      </button>
    </form>
  );
}
