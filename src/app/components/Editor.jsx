import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
const Editor = () => {
  const [value, setValue] = useState("");
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Viết nội dung bài viết ở đây..."
      />

      <h3 className="mt-4">Xem trước:</h3>
      <div
        style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
};

export default Editor;
