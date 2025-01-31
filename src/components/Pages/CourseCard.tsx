import React from 'react'
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
    image: string;
    courseName: string;
    courseSlug: number; 
}

const CourseCard: React.FC<CourseCardProps> = ({ image, courseName, courseSlug }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(`/courses/content-titles/${courseSlug}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 w-[300px] h-[400px]">
        <img 
            src={image} 
            alt={courseName} 
            className="w-full h-[200px] object-cover"
        />
        
        <div className="p-6 flex flex-col justify-center items-center h-[200px]">
            <h2 className="text-2xl font-bold mb-4 text-center line-clamp-2">{courseName}</h2>
            
            <button 
                onClick={handleNavigation} 
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors duration-300"
            >
                View Course
            </button>
        </div>
    </div>
    )
}

export default CourseCard
