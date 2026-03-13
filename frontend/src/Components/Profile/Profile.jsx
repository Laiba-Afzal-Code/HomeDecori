import { useEffect, useState } from "react";
import userimg from "../../assets/user.jpg";
import userAxios from "../../utils/userAxios";
import "./profile.css";
import Navbar from "../Minicompo/Navbar/Navbar";
import Footer from "../Footer/Footer";

import { FaHome, FaCouch, FaChair, FaBlogger } from "react-icons/fa";
export default function Profile() {
  const [user, setUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // save token after login
        const { data } = await userAxios.get(`/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
     localStorage.removeItem("user");
    delete userAxios.defaults.headers.common["Authorization"];
    window.location.replace("/");
  };
  if (!user) return <p>Loading profile...</p>;


  return (
    <>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="profile-page">
          <div className="floating-icons">
                <FaCouch className="icon couch" />
                <FaChair className="icon chair" />
                <FaHome className="icon homeIcon" />
                <FaBlogger className="icon blogicon"/>
              </div>
        <h2>Profile</h2>
        <div className="profile-card">
          <img
            src={user.avatar || userimg}
            alt={user.name}
            className="avatar"
          />
          <h3>{user.name}</h3>
          <p><strong>Email: </strong>{user.email}</p>
          <p><strong>Role: </strong> {user.role}</p>
          <button onClick={handleLogout} className="logout">
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
