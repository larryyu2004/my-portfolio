import React from "react";
import { marked } from "marked";

const markdown = `
# Markdown Example
- This is a **bold** text
- _Italicized text_
- [Link](https://example.com)
`;

const MarkdownComponent = () => {
  return (
    <div dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
  );
};

export default MarkdownComponent;