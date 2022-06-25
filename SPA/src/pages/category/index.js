import React from "react";
import { useState } from "react";
import Button from "../../components/Button";
import PageTitle from "../../components/PageTitle";
import TextBox from "../../components/TextBox";
import TableData from "../../components/Table/TableData";
import TableRow from "../../components/Table/TableRow";
import Table from "../../components/Table/TableFrame";
import TableHeader from "../../components/Table/TableHeader";
import "./index.css";

export default function Category() {
  const [category, setCategory] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (category === "") {
      alert("Enter category");
    } else {
      alert("Category added");
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setCategory("");
  };

  return (
    <>
      <div>
        <PageTitle title="Category"></PageTitle>
        <div className="category-body">
          <TextBox
            placeholder="Enter new category name..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
          />
          <span className="span"></span>
          <Button onClick={handleAdd}>Add</Button>
          <span className="span"></span>
          <Button onClick={handleClear}>clear</Button>
        </div>
        <div className="category-display">
          <div className="category-table-container">
            <Table>
              <TableRow>
                <TableHeader className="data">Categories</TableHeader>
                <TableHeader className="actions">Actions</TableHeader>
              </TableRow>
              <TableRow>
                <TableData>Sample Category</TableData>
                <TableData>
                  <Button>Edit</Button>
                </TableData>
              </TableRow>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
