import React from "react";
import "./index.css";

const TextBox = (props) => {
  return (
    <>
      <input type="text" {...props} className="textbox" />
    </>
  );
};

export default TextBox;
