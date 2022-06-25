import React from "react";
import "./../index.css";

export default function TableData(props) {
  return <td className="tabledata">{props.children}</td>;
}
