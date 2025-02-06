import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import Nav from "./Nav";

interface CourseContent {
  content_id: number;
  course_id: number;
  title: string;
  position: number;
  created_at: string;
}

interface Subheading {
  id: number;
  content_id: number;
  title: string;
  position: number;
  subheading_id: number;
}

interface SubheadingContent {
  id: number;
  subheading_id: number;
  content: string;
}

interface Category {
  course_id: number;
  name: string;
  image: string;
}

const CourseDetail = () => {
  const { courseSlug } = useParams();
  const [courseData, setCourseData] = useState<CourseContent[] | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<CourseContent | null>(null);
  const [subheadings, setSubheadings] = useState<Subheading[] | null>(null);
  const [subheadingContent, setSubheadingContent] = useState<SubheadingContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCourseDetails = async (courseId: number) => {
    try {
      const response = await axios.get(
        `http://13.200.57.52/api/course/content-titles/${courseId}`
      );
      setCourseData(response.data.data);
      if (response.data.data && response.data.data.length > 0) {
        setSelectedTopic(response.data.data[0]);
        await fetchSubheadings(response.data.data[0].content_id);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setLoading(false);
    }
  };

  const fetchCategory = async () => {
    try {
      const res = await axios.get("http://13.200.57.52/api/getcategories/1");
      setCategories(res.data.data);
      if (res.data.data.length > 0) {
        setSelectedCourse(res.data.data[0].course_id);
        await fetchCourseDetails(res.data.data[0].course_id);
      }
    } catch (err) {
      console.log(err, "error in fetch category");
    }
  };

  const fetchSubheadings = async (contentId: number) => {
    try {
      const response = await axios.get(
        `http://13.200.57.52/api/subheadings/${contentId}`
      );
      setSubheadings(response.data.data);
      if (response.data.data[0]) {
        await fetchSubheadingContent(response.data.data[0].id);
      }
    } catch (error) {
      console.error("Error fetching subheadings:", error);
    }
  };

  const fetchSubheadingContent = async (subheadingId: number) => {
    try {
      const response = await axios.get(
        `http://13.200.57.52/api/subheading-content/${subheadingId}`
      );
      if (response.data && response.data.data) {
        setSubheadingContent(response.data.data);
      }
    } catch (error) {
      setSubheadingContent(null);
    }
  };

  const handleCourseClick = (courseId: number) => {
    setSelectedCourse(courseId);
    setSelectedTopic(null);
    setSubheadings(null);
    setSubheadingContent(null);
    fetchCourseDetails(courseId);
  };

  const handleTopicClick = async (topic: CourseContent) => {
    setSelectedTopic(topic);
    setSubheadings(null);
    setSubheadingContent(null);
    await fetchSubheadings(topic.content_id);
  };

  const handleSubheadingClick = async (subheading: Subheading) => {
    await fetchSubheadingContent(subheading.subheading_id);
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <>
      <Nav />
      <div className="container1 pt-4">
        <div className="mb-4 px-3">
          <div className="d-flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.course_id}
                onClick={() => handleCourseClick(category.course_id)}
                className={`btn rounded-pill ${
                  selectedCourse === category.course_id
                    ? 'btn-primary'
                    : 'btn-outline-primary'
                }`}
                style={{
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  minWidth: '80px'
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-md-2">
            <div className="list-group">
              {courseData?.map((topic) => (
                <div key={topic.content_id}>
                  <button
                    className={`list-group-item list-group-item-action ${
                      selectedTopic?.content_id === topic.content_id
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleTopicClick(topic)}
                  >
                    {topic.title}
                  </button>
                  {selectedTopic?.content_id === topic.content_id && (
                    <div className="sub-list ms-3 mt-2">
                      {subheadings?.map((subheading) => (
                        <button
                          key={subheading.id}
                          className="list-group-item list-group-item-action text-muted"
                          onClick={() => handleSubheadingClick(subheading)}
                        >
                          {subheading.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-8">
            <div className="card p-4">
              {subheadingContent ? (
                <div className="mt-2">
                  <div
                    className="content-body"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(subheadingContent.content),
                    }}
                  />
                </div>
              ) : (
                <div className="text-muted">
                  Choose topic to study, from left nav-bar
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
