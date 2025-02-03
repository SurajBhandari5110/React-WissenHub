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

const CourseDetail = () => {
  const { courseSlug } = useParams();
  const [courseData, setCourseData] = useState<CourseContent[] | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<CourseContent | null>(null);
  const [subheadings, setSubheadings] = useState<Subheading[] | null>(null);
  const [subheadingContent, setSubheadingContent] = useState<SubheadingContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseSlug]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`http://13.200.57.52/api/course/content-titles/${courseSlug}`);
      setCourseData(response.data.data);
      setSelectedTopic(response.data.data[0]);
      if (response.data.data[0]) {
        fetchSubheadings(response.data.data[0].content_id);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setLoading(false);
    }
  };

  const fetchSubheadings = async (contentId: number) => {
    try {
      const response = await axios.get(`http://13.200.57.52/api/subheadings/${contentId}`);
      setSubheadings(response.data.data);
      if (response.data.data[0]) {
        fetchSubheadingContent(response.data.data[0].id);
      }
    } catch (error) {
      console.error("Error fetching subheadings:", error);
    }
  };

  const fetchSubheadingContent = async (subheadingId: number) => {
    try {
      const response = await axios.get(`http://13.200.57.52/api/subheading-content/${subheadingId}`);
      if (response.data && response.data.data) {
        setSubheadingContent(response.data.data);
      }
    } catch (error) {
      setSubheadingContent(null);
    }
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
      <Nav/>
      <div className="container1 pt-4">
      <div className="row">
        <div className="col-md-2">
          <div className="list-group">
            {courseData?.map((topic) => (
              <div key={topic.content_id}>
                <button
                  className={`list-group-item list-group-item-action ${
                    selectedTopic?.content_id === topic.content_id ? "active" : ""
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
              <div className="text-muted">Choose topic to study, from left nav-bar</div>
            )}
          </div>
        </div>
      </div>
    </div>
      </>
    
  );
};

export default CourseDetail;
