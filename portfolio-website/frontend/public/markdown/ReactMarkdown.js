import React from "react";
import ReactMarkdown from "react-markdown";

const markdown = `
# Hello, Markdown in React!
- This is a list item
- Another item
**Bold Text** and _Italic Text_
`;

const MarkdownComponent = () => {
  return (
    <div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownComponent;