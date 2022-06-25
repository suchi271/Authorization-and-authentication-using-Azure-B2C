import React from "react";
import "./../index.css";

export default function TableRow(props) {
  return <tr className="tablerow">{props.children}</tr>;
}
