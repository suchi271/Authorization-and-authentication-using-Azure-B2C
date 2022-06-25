import React from "react";
import "./index.css";

const TextArea = (props) => {
  return (
    <>
      <textarea className="textarea" {...props}></textarea>
    </>
  );
};

export default TextArea;
