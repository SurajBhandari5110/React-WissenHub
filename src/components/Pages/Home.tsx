import { useEffect, useState } from "react";
import Nav from "./Nav";
import CourseCard from "./CourseCard";
import axios from "axios";

interface Course {
  course_id: number;
  name: string;
  courseSlug: number;
  image: string;
}

const Home = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://13.200.57.52/api/courses");
      setCourses(response.data.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Hero Section with Background Image */}
      <div
        className="w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://img.freepik.com/free-vector/woman-working-new-app_23-2148682102.jpg?t=st=1737879675~exp=1737883275~hmac=e17ba6338cfe9e14b516920d13a2eb1b74ad63273d3392f2d96a20b771ca7e8e&w=1060")`, // Replace with your preferred image URL
        }}
      


      >
        <Nav />
        <div className="text-center text-white bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-6xl font-bold mb-4">Let's Start Learning</h1>
          <p className="text-xl">Something new today</p>
        </div>
      </div>

      {/* Courses Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Courses</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {loading ? (
            <p className="text-gray-500">Loading courses...</p>
          ) : (
            courses.map((course) => (
              <CourseCard
                key={course.course_id}
                image={course.image}
                courseName={course.name}
                courseSlug={course.course_id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
