import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from "react-markdown";
  
const Blog = () => {
  
  const ProjectsdropDownIsVisible = useSelector((state) => state.Projectsdropdown.isVisible);
  const HomedropDownIsVisible = useSelector((state) => state.Homedropdown.isVisible);
  const ContactDropdownIsVisible = useSelector((state) => state.Contactdropdown.isVisible);
  const blurBackground = `bg-black/20`

  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    fetch("http://localhost:5002/markdown/list")
      .then((res) => res.json())
      .then((files) => {
        setFileList(files.markdownFiles);
        if(files.length > 0) {
          setSelectedFile(files[0]);
        }
      })
      .catch((error) => console.error("Error fetching markdown files:", error));
  }, []);

  useEffect(() => {
    if(selectedFile) {
      fetch(`${process.env.PUBLIC_URL}/markdown/markdownContent/${selectedFile}`)
        .then((response) => response.text())
        .then((text) => setContent(text))
        .catch((error) => console.error("Error loading markdown:", error));
    }
  }, [selectedFile]);

  return (
    <>
      <div className={`min-h-screen mt-[60px] p-6 overflow-hidden
      ${ ProjectsdropDownIsVisible ? blurBackground : '' } 
      ${ HomedropDownIsVisible ? blurBackground : '' }
      ${ ContactDropdownIsVisible ? blurBackground : '' }
      dark:bg-[rgb(9,9,10)] duration-200 `}>

        <div className='flex w-screen h-screen'>
        <div className='flex flex-col w-1/4 border-r border-gray-300 pr-4 overflow-y-auto h-full'>
        <h1 className="text-[40px] font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-200
                    dark:from-orange-600 dark:to-yellow-300 text-transparent bg-clip-text">Blog</h1>
          {fileList.map((file, index) => (
            <button
              key={index}
              onClick={() => setSelectedFile(file)}
              className={`text-left dark:text-white p-2 font-bold rounded-md ${
                selectedFile === file
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 dark:from-orange-600 dark:to-yellow-300 dark:bg-orange-600 text-white"
                  : "hover:bg-blue-200 dark:hover:bg-gray-700"
              }`}
            >
              {file.replace(".md", "")}
            </button>
          ))}
        </div>
        <div className="prose lg:prose-xl text-gray-800 dark:text-white w-3/4 pl-5 mr-5 overflow-y-auto h-full">
          <ReactMarkdown components={{
            h1: ({node, ...props}) => <h1 className="text-4xl font-bold pt-3 pb-3" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-1xl font-bold" {...props} />,
            p: ({node, ...props}) => <p className="mb-4" {...props}
            style={{ textIndent: '2em' }} />
          }}>
            {content}
          </ReactMarkdown>
        </div>
        </div>

      </div>
    </>
  );
};

export default Blog;