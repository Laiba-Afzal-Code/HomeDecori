import { useState } from "react";
import "./App.css";
import Home from "./Pages/Home";
import BlogOpen from "./Components/Blogopen/Blogopen";
import Author from "./Pages/Author/Author";
import { Routes, Route } from "react-router-dom";
import AdminRoutes from "./Admin/routes/AdminRoutes.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import Testimonials from "./Components/Testimonial/Testimonial.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import CategoryPosts from "./Pages/AllBlogs/CategoryPosts.jsx";
import AllBlogs from "./Pages/AllBlogs/AllBlogs.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import About from "./Pages/Contact/About.jsx";
import SearchResults from "./Components/Minicompo/Navbar/SearchResults.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy.jsx";
import {PageLoader} from '../src/utils/loading.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeCategoryShowcase from "./Pages/HomeCategoryShowcase/HomeCategoryShowcase.jsx";
import TextEditor from "./Pages/TextEditor/TextEditor.jsx";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  //  function AdminRoute({ children }) {
  // const isAdmin = localStorage.getItem("adminToken");
  // return isAdmin ? children : <Navigate to="/admin/login" />;
  // }
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
  };
  return (
    <>
      <div className="app">
        {/* <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
        <ToastContainer />
        <Routes>
          <Route
            path="posts/:id/open/live/homedecorim/:slug"
            element={<BlogOpen />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/author/:authorId" element={<Author />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/category/:category" element={<CategoryPosts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/loder" element={<PageLoader/>}/>
           <Route path="/categorylist" element={<HomeCategoryShowcase />} />
           
           <Route path="/texteditor" element={<TextEditor />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/testimonial" element={<Testimonials />} />
          <Route path="/*" element={<AdminRoutes />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
