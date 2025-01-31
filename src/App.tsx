import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import CourseCard from "./components/Pages/CourseCard";
import CourseDetail from "./components/Pages/CourseDetail";
import Pagedetails from "./components/Pages/Pagedetails";

// import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Pagedetails />} />

          <Route path="/courses/content-titles/:courseSlug" element={<CourseDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
