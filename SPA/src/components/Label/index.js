import React from "react";
import "./index.css";

const Label = (props) => {
  return (
    <>
      <label className="label">{props.children}</label>
    </>
  );
};

export default Label;
