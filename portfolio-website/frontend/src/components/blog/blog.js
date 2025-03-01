import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
  
const Blog = () => {
  
  const ProjectsdropDownIsVisible = useSelector((state) => state.Projectsdropdown.isVisible);
  const HomedropDownIsVisible = useSelector((state) => state.Homedropdown.isVisible);
  const ContactDropdownIsVisible = useSelector((state) => state.Contactdropdown.isVisible);
  const blurBackground = `bg-black/20`

  const [content, setContent] = useState("");
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/markdown/leetcode24.md`)
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error("Error loading markdown:", error));
  }, []);

  return (
    <div className={`min-h-screen mt-[60px] p-6 
    ${ ProjectsdropDownIsVisible ? blurBackground : '' } 
    ${ HomedropDownIsVisible ? blurBackground : '' }
    ${ ContactDropdownIsVisible ? blurBackground : '' }
    dark:bg-[rgb(9,9,10)] duration-200 `}>
      <div className="prose lg:prose-xl text-gray-800 dark:text-white">
        <ReactMarkdown components={{
          h1: ({node, ...props}) => <h1 className="text-4xl font-bold" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-bold" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-1xl font-bold" {...props} />,
          p: ({node, ...props}) => <p className="pl-6" {...props} />
        }}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Blog;