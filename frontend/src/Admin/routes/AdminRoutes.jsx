import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import PostList from "../pages/Posts";
import CreatePost from "../pages/CreatePost";
import AdminLayout from "../layout/AdminLayout";
import EditPost from "../pages/EditPost";
import Users from "../pages/Users";
import AdminCategory from "../pages/AdminCategory";
import AdminSettings from "../pages/AdminSettings";
import CreateAdmin from "../../Pages/Auth/CreateAdmin";
import NotFound from "../../Pages/NotFound/NotFound";

export default function AdminRoutes() {
  return (
    <>
    
    <Routes>
      {/* ADMIN LAYOUT */}
      <Route path="/" element={<AdminLayout />}>
        {/* DEFAULT PAGE → /admin */}
        <Route index element={<Dashboard />} />

        {/* CHILD ROUTES */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="posts" element={<PostList />} />
         <Route path="posts/edit/:id" element={<EditPost />} />
        <Route path="posts/create" element={<CreatePost />} />
          <Route path="users" element={<Users />} />
          <Route path="create-admin" element={<CreateAdmin />} />
          <Route path="categories" element={<AdminCategory />} />
           <Route path="settings" element={<AdminSettings />} />
           {/* 404 page */}
                    <Route path="*" element={<NotFound />} />
      </Route>
    
    </Routes>
    </>
  );
}
