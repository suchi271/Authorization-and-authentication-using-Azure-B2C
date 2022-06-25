import React from "react";
import "./index.css";

const DropDownButton = (props) => {
  return (
    <>
      <select name="category" id="category" className="dropdown" {...props}>
        {props.children}
      </select>
    </>
  );
};

export default DropDownButton;
