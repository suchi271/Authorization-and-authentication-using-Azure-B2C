import React from "react";
import "./../index.css";

export default function TableData(props) {
  return <th className="tableheader">{props.children}</th>;
}
