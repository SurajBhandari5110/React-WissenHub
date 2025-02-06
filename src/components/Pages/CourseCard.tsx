import React from "react";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  image: string;
  courseName: string;
  courseSlug: number;
}

const CourseCard: React.FC<CourseCardProps> = ({
  image,
  courseName,
  courseSlug,
}) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/courses/content-titles/${courseSlug}`);
  };

  return (
    <div
      className="card shadow-lg rounded overflow-hidden"
      style={{ width: "18rem", height: "25rem" }}
    >
      <img
        src={image}
        alt={courseName}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
        <h2 className="card-title text-truncate" style={{ maxHeight: "3rem" }}>
          {courseName}
        </h2>

        <button onClick={handleNavigation} className="btn btn-primary mt-3">
          View Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
