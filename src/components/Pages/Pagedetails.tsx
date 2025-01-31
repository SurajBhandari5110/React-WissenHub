import  { useState } from "react";

interface TopicContent {
  id: number;
  title: string;
  content: string;
}

const topics: TopicContent[] = [
  {
    id: 1,
    title: "Introduction to Python",
    content: "Python is a high-level, interpreted programming language..."
  },
  {
    id: 2,
    title: "Basic Syntax",
    content: "Python syntax is clean and readable..."
  },
  {
    id: 3,
    title: "Data Types",
    content: "Python has several built-in data types..."
  }
];

const Pagedetails = () => {
  const [selectedTopic, setSelectedTopic] = useState<TopicContent>(topics[0]);

  const handleTopicClick = (topic: TopicContent) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="pt-10 px-32">
      <h1 className="text-3xl font-bold">Python</h1>
      <div className="flex gap-20 pt-5">
        <div className="flex flex-col gap-2 w-[300px]">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`border p-2 h-fit cursor-pointer hover:bg-gray-100 ${
                selectedTopic.id === topic.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => handleTopicClick(topic)}
            >
              {topic.title}
            </div>
          ))}
        </div>

        <div className="border p-6 w-[800px]">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{selectedTopic.title}</h1>
            <p className="text-base leading-relaxed break-words">
              {selectedTopic.content}
            </p>
            <h1 className="text-2xl font-bold">Features and Benefits</h1>
            <p className="text-base leading-relaxed break-words">
              Python offers numerous features including easy-to-learn syntax, extensive libraries, and cross-platform compatibility. It's widely used in web development, data science, AI, and automation.
            </p>
            <h1 className="text-2xl font-bold">Applications</h1>
            <p className="text-base leading-relaxed break-words">
              Python is used in various domains including web development with Django and Flask, data analysis with pandas and numpy, machine learning with scikit-learn and TensorFlow.
            </p>
            <h1 className="text-2xl font-bold">Community and Support</h1>
            <p className="text-base leading-relaxed break-words">
              Python has a large, active community that contributes to its ellllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllxtensive package ecosystem. The Python Package Index (PyPI) contains over 300,000 packages for various purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagedetails;