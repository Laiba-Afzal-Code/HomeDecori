import { useEffect, useState } from "react";
import "../styles/adminCategory.css";
import adminAxios from "../api/adminAxios";
import { toast } from "react-toastify";

export default function AdminCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");
  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const { data } = await adminAxios.get("/categories/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(data);
    } catch (err) {
      console.error(
        "Fetch categories error:",
        err.response?.data?.message || err.message,
      );
    }
  };

  // Create a new category
 const handleCreate = async (e) => {
  e.preventDefault();
  const trimmedName = name.trim();
  if (!trimmedName) return alert("Category name cannot be empty");

  try {
    const { data } = await adminAxios.post(
      "/categories/createcate",
      { name: trimmedName }, // trimmed
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setCategories((prev) => [...prev, data]);
    setName("");
    toast.success("Successfully Creating Category")
  } catch (err) {
    console.error(
      "Create category error:",
      err.response?.data?.message || err.message
    );toast.error(err.response?.data?.message ||"Error creating category")
  
  }
};


  // Delete a category
  const handleDelete = async (id) => {
    // if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await adminAxios.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories((prev) => prev.filter((c) => c._id !== id));
      toast.success("Deleted category")
    } catch (err) {
      toast.error(
        "Delete category error:",
       
      );
      toast.error(err.response?.data?.message ||"Error Deleting category")
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="admin-category-page">
      <h2>🗂️Manage Categories</h2>

      {/* Create Category Form */}
      <form onSubmit={handleCreate} className="category-form">
        <input
          type="text"
          placeholder="New category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
       <button type="submit" disabled={!name.trim()}>Create Category</button>

      </form>

      {/* Categories Table */}
      <table className="category-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Created At</th>
            <th>Action</th> {/* Added column for Delete */}
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.slug}</td>
              <td>{new Date(c.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(c._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
