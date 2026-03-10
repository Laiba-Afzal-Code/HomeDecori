import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
import Logo from "../../assets/homeo.svg";
export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove the JWT
    window.location.href = "/login"; // redirect to login page
  };

  return (
    <aside className="sidebar">
      <div className="logoadmin">
        <img src={Logo} alt="Homedecorim" width={90} />
        <h1>Admin</h1>
      </div>
      <nav>
        <NavLink to="dashboard">📊Dashboard</NavLink>
        <NavLink to="posts">📝Posts</NavLink>
        <NavLink to="users">👤Users</NavLink>
        <NavLink to="categories">🗂️Categories</NavLink>
        <NavLink to="settings">🧑‍💼Profile</NavLink>
        <NavLink to={"/"}>⭐View Site</NavLink>
        <NavLink to={"/login"} className="" onClick={handleLogout}>
          🚪 LogOut
        </NavLink>
      </nav>
    </aside>
  );
}
