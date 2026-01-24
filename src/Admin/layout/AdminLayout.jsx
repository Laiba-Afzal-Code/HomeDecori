import Sidebar from "./Sidebar";

import "../styles/layout.css";
import {  Outlet } from "react-router-dom";


export default function AdminLayout() {
  return (
    <>
    <div className="admin">
 
      <Sidebar />
      <div className="admin-main">
        <div className="admin-content" style={{ padding: "40px" }}>
          <Outlet />
          
        </div>
      </div>
    </div>
    </>
  );
}
