import React from "react";
import "./../index.css";

const Table = (props) => {
  return (
    <>
      <table className="table">{props.children}</table>
    </>
  );
};

export default Table;
