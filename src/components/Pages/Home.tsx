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

interface Category {
  category_id: number;
  title: string;
}

interface CategoryCourse {
  id: number;
  category_id: number;
  course_id: number;
  category: Category;
  course: Course;
}

const Home = () => {
  const [categoryCourses, setCategoryCourses] = useState<CategoryCourse[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    fetchCategoryCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://13.200.57.52/api/courses");
      setCourses(response.data.data);
      // console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false);
    }
  };

  const fetchCategoryCourses = async () => {
    try {
      const res = await axios.get("http://13.200.57.52/api/getcategory");
      setCategoryCourses(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error, "error while fetching courses");
      setLoading(false);
    }
  };

  const groupedCourses = categoryCourses.reduce((acc, item) => {
    const categoryTitle = item.category.title;
    if (!acc[categoryTitle]) {
      acc[categoryTitle] = [];
    }
    acc[categoryTitle].push(item.course);
    return acc;
  }, {} as Record<string, Course[]>);

  return (
    <>
      <Nav />
      <div className="position-relative">
        {/* Hero Section with Background Image */}
        <div
          className="w-100 vh-100 d-flex align-items-center justify-content-center bg-cover bg-center"
          style={{
            backgroundImage: `url("https://img.freepik.com/free-vector/woman-working-new-app_23-2148682102.jpg?t=st=1737879675~exp=1737883275~hmac=e17ba6338cfe9e14b516920d13a2eb1b74ad63273d3392f2d96a20b771ca7e8e&w=1060")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-center text-white bg-dark bg-opacity-50 p-4 rounded">
            <h1 className="display-3 fw-bold mb-3">Let's Start Learning</h1>
            <p className="fs-4">Something new today</p>
          </div>
        </div>

        <div className="container py-5">
          {loading ? (
            <p className="text-center">Loading courses...</p>
          ) : (
            Object.entries(groupedCourses).map(([categoryTitle, courses]) => (
              <div key={categoryTitle} className="mb-5">
                <h2 className="mb-4">{categoryTitle}</h2>
                <div className="row">
                  {courses.map((course) => (
                    <div key={course.course_id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                      <CourseCard
                        image={course.image}
                        courseName={course.name}
                        courseSlug={course.course_id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Courses Section */}
        <div className="container py-5">
          <h2 className="mb-4">Our Courses</h2>
          <div className="row">
            {loading ? (
              <p className="">Loading courses...</p>
            ) : (
              courses.map((course) => (
                <div key={course.course_id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                  <CourseCard
                    image={course.image}
                    courseName={course.name}
                    courseSlug={course.course_id}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="display-5 fw-bold mb-3">Boost Your Learning</h2>
          <p className="lead">
            Prepare yourself with interview questions and test your knowledge
            with quizzes.
          </p>

          <div className="row g-4 mt-4">
            <div className="col-md-6">
              <div className="card shadow-lg border-0">
                <img
                  src="https://img.freepik.com/free-vector/job-interview-concept-illustration_114360-24598.jpg"
                  className="card-img-top"
                  alt="Interview Questions"
                />
                <div className="card-body text-center">
                  <h3 className="h5 fw-bold">Interview Questions</h3>
                  <p className="">
                    Practice real-world interview questions curated by experts.
                  </p>
                  <a href="#" className="btn btn-success">
                    Start Practicing
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-lg border-0">
                <img
                  src="https://img.freepik.com/free-vector/modern-question-mark-help-support-page_1017-27395.jpg"
                  className="card-img-top"
                  alt="Quizzes"
                />
                <div className="card-body text-center">
                  <h3 className="h5 fw-bold">Quizzes</h3>
                  <p className="">
                    Test your skills and reinforce learning with topic-specific
                    quizzes.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Take a Quiz
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container my-5">
        <h1 className="text-center fw-bold mb-4">
          Overcome Your Fear of Coding with WissenHub PRO
        </h1>

        <div className="row g-4">
          <div className="col-lg-4">
            <div className="p-4 bg-dark text-light rounded shadow-lg">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <h5 className="fw-bold">
                    <i className="fas fa-laptop-code me-2 text-success"></i>{" "}
                    Hands-on Learning
                  </h5>
                  <p className="text-muted">
                    Practice what you learn with our interactive courses,
                    problems, and quizzes.
                  </p>
                </li>
                <li className="fw-bold">
                  <i className="fas fa-tasks me-2 text-primary"></i> Practice
                  Projects
                </li>
                <li className="fw-bold">
                  <i className="fas fa-lightbulb me-2 text-warning"></i> Coding
                  Challenges
                </li>
                <li className="fw-bold">
                  <i className="fas fa-robot me-2 text-danger"></i> AI Mentor
                </li>
                <li className="fw-bold">
                  <i className="fas fa-certificate me-2 text-info"></i>{" "}
                  Professional Certificates
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="p-4 bg-dark text-light rounded shadow-lg">
              <h5 className="fw-bold text-success">
                Offer: 50% Off till March 2025
              </h5>
              <h3 className="fw-bold">Get Hired from Top MNCs</h3>
              <img
                src="https://img.freepik.com/free-vector/gamer-playing-with-computer_52683-15038.jpg"
                className="img-fluid rounded shadow-sm mt-3"
                alt="Student studying"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <a href="#" className="btn btn-primary btn-lg">
            Try WissenHub PRO →
          </a>
        </div>
      </div>

      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">Why WissenHub?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card text-center shadow-lg border-0">
              <div className="card-body">
                <i className="fas fa-users fa-3x text-primary mb-3"></i>
                <h5 className="fw-bold">For Programmers, By Programmers</h5>
                <p className="">
                  We're active programmers creating resources we wish we had
                  when learning to code.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow-lg border-0">
              <div className="card-body">
                <i className="fas fa-star fa-3x text-warning mb-3"></i>
                <h5 className="fw-bold">Coding Isn't Easy</h5>
                <p className="">
                  We believe in honest, practical learning that prepares you for
                  real-world challenges.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow-lg border-0">
              <div className="card-body">
                <i className="fas fa-code fa-3x text-success mb-3"></i>
                <h5 className="fw-bold">Learn by Doing</h5>
                <p className="">
                  Every concept includes complete code examples you can run,
                  modify, and apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
