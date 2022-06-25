import React from "react";
import "./index.css";

const PageTitle = (props) => {
  return (
    <>
      <div className="title-box">
        <h3 className="title">{props.title}</h3>
      </div>
    </>
  );
};

export default PageTitle;
