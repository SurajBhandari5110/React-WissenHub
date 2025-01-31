import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

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
  const [selectedTopic, setSelectedTopic] = useState<CourseContent | null>(
    null
  );
  const [subheadings, setSubheadings] = useState<Subheading[] | null>(null);
  const [subheadingContent, setSubheadingContent] =
    useState<SubheadingContent | null>(null);
  const [loading, setLoading] = useState(true);

  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //     ["bold", "italic", "underline", "strike"],
  //     [{ list: "ordered" }, { list: "bullet" }],
  //     ["link", "image", "code-block"],
  //     ["clean"],
  //   ],
  // };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseSlug]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(
        `http://13.200.57.52/api/course/content-titles/${courseSlug}`
      );
      setCourseData(response.data.data);
      console.log("fetchCourseDetails", response.data);
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
      const response = await axios.get(
        `http://13.200.57.52/api/subheadings/${contentId}`
      );
      setSubheadings(response.data.data);
      console.log("fetchsubheading", response.data);
      if (response.data.data[0]) {
        fetchSubheadingContent(response.data.data[0].id);
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
      console.log("fetchSubheadingContent ", response.data);
      if (response.data && response.data.data) {
        setSubheadingContent(response.data.data);
        console.log("Content fetched successfully:", response.data);
      }
    } catch (error) {
      // Handle the 404 gracefully
      setSubheadingContent(null);
      console.log("No content available for this subheading yet");
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
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-10 px-32">
      {/* <h1 className="text-3xl font-bold">{courseSlug}</h1> */}
      <div className="flex gap-20 pt-5">
        <div className="flex flex-col gap-2 w-[300px]">
          {courseData?.map((topic) => (
            <div key={topic.content_id}>
              <div
                className={`border p-2 h-fit cursor-pointer hover:bg-gray-100 ${
                  selectedTopic?.content_id === topic.content_id
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={() => handleTopicClick(topic)}
              >
                {topic.title}
              </div>

              {selectedTopic?.content_id === topic.content_id && (
                <div className="ml-4 mt-2">
                  {subheadings?.map((subheading) => (
                    <div
                      key={subheading.id}
                      className="cursor-pointer hover:bg-gray-50 p-2 rounded text-sm"
                      onClick={() => handleSubheadingClick(subheading)}
                    >
                      {subheading.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border p-6 w-[800px]">
          <div className="flex flex-col gap-4">
            {subheadingContent ? (
              <div className="mt-2">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(subheadingContent.content),
                  }}
                />
              </div>
            ) : (
              <div className="mt-2 text-base text-gray-500">
                Content for this section is coming soon!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
