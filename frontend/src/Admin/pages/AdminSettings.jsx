import { useEffect, useState } from "react";
import "../styles/adminSettings.css";
import adminAxios from "../api/adminAxios";
import { Link } from "react-router-dom";

export default function AdminSettings() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const { data } = await adminAxios.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(data);
      } catch (err) {
        console.error(
          "Fetch admin profile error:",
          err.response?.data?.message || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) return <p>Loading settings...</p>;
  if (!admin) return <p>Unable to load admin profile</p>;

  return (
    <div className="admin-settings">
      <h2>Admin Settings</h2>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="avatar">
          {admin.name?.charAt(0).toUpperCase()}
        </div>

        <div className="profile-info">
          <p><strong>Name:</strong> {admin.name}</p>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Role:</strong> {admin.role}</p>
          <p>
  <strong>Joined:</strong>{" "}
  {admin?.createdAt
    ? new Date(admin.createdAt).toLocaleDateString("en-GB")
    : "N/A"}
  
</p>
        </div>
      </div>

      {/* Settings Actions */}
      <div className="settings-actions">
        <Link to={"/admin/posts/create"}>
        <button className="btn secondary">
          📝Create Posts
        </button>
        </Link>
 <Link to={"/admin/categories"}>
        <button className="btn secondary">
          📂Create Category
        </button>
 </Link>

 <Link to={"/admin/create-admin"}>
        <button className="btn secondary">
          🧑‍💼New Admin
        </button>
 </Link>
        <button className="btn danger" onClick={handleLogout}>
          🚪Logout
        </button>
      </div>
    </div>
  );
}
