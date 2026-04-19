import { useEffect, useState } from "react";
import "../styles/users.css";
import adminAxios from "../api/adminAxios";
import { toast } from "react-toastify";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await adminAxios.get(`/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
      console.log(data)
    } catch (err) {
      console.error(err);
    }
  };

  // 🗑️ DELETE USER FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await adminAxios.delete(`/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Deleting User ID:", id);
      // Remove user from UI instantly
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="admin-users-page">
      <h2>👤 All Users</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Action</th> {/* NEW COLUMN */}
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>

              {/* 🗑️ DELETE BUTTON */}
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(u._id)}
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
