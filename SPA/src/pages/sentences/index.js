import React, { Component } from "react";
import DropDownButton from "./../../components/DropDownButton/index";
import Label from "./../../components/Label/index";
import TextArea from "./../../components/TextArea/index";
import Button from "./../../components/Button/index";
import Option from "./../../components/DropDownButton/option";
import TableData from "../../components/Table/TableData/index";
import TableRow from "../../components/Table/TableRow/index";
import Table from "../../components/Table/TableFrame/index";
import TableHeader from "./../../components/Table/TableHeader/index";
import "./index.css";
import PageTitle from "../../components/PageTitle";

class Sentences extends Component {
  state = {
    category: "",
    sentence: "",
  };

  handleAdd = (e) => {
    e.preventDefault();
    if (this.state.sentence === "" || this.state.category === "") {
      if (this.state.sentence === "" && this.state.category === "") {
        alert("Select category and Enter sentence");
      } else if (this.state.sentence === "") {
        alert("Enter sentence");
      } else {
        alert("Select category");
      }
    } else {
      alert("Sentence added");
    }
    // console.log(this.state);
    this.setState({ category: "", sentence: "" });
  };

  handleClear = (e) => {
    e.preventDefault();
    this.setState({ sentence: "" });
  };

  handleName = (e) => {
    e.preventDefault();
    const sent = this.state.sentence + "<Name>";
    this.setState({ sentence: sent });
  };

  handlePronoun = (e) => {
    e.preventDefault();
    const sent = this.state.sentence + "<He/She/They/Them>";
    this.setState({ sentence: sent });
  };

  handleProject = (e) => {
    e.preventDefault();
    const sent = this.state.sentence + "<ProjectName>";
    this.setState({ sentence: sent });
  };

  render() {
    return (
      <>
        <div className="sentences">
          <PageTitle title="Sentence Bag" />

          <div className="sentence-container">
            <div className="label1">
              <Label>Categories</Label>
            </div>
            <div className="sentence-dropdown">
              <DropDownButton
                value={this.state.category}
                onChange={(e) => this.setState({ category: e.target.value })}
              >
                <Option value="">--Select Category--</Option>
                <Option value="technical skills">Technical Skills</Option>
                <Option vlaue="communication">Communication</Option>
                <Option value="attitude">Attitude</Option>
                <Option value="leadership">Leadership</Option>
              </DropDownButton>
            </div>

            <div className="label2">
              <Label>New Sentence</Label>
            </div>

            <div className="sentence-buttons">
              <Button onClick={this.handleAdd}>ADD</Button>
              <span className="span"></span>
              <Button onClick={this.handleClear}>CLEAR</Button>
            </div>

            <div className="sentence-textarea">
              <TextArea
                className="textarea"
                placeholder="Enter sentence"
                value={this.state.sentence}
                onChange={(e) => this.setState({ sentence: e.target.value })}
              ></TextArea>
            </div>

            <div className="label3">
              <Label>Placeholders</Label>
            </div>

            <div className="placeholder-buttons">
              <Button onClick={this.handleName}>NAME</Button>
              <span className="span"></span>
              <Button onClick={this.handlePronoun}>PRONOUN</Button>
              <span className="span"></span>
              <Button onClick={this.handleProject}>PROJECT</Button>
            </div>
          </div>
        </div>

        <div className="sentence-display">
          <Label>Sentences in this Category</Label>
          <div className="table-container">
            <Table>
              <TableRow>
                <TableHeader className="data">Sentences</TableHeader>
                <TableHeader className="actions">Actions</TableHeader>
              </TableRow>
              <TableRow>
                <TableData>Sample Sentence</TableData>
                <TableData>
                  <Button>Edit</Button>
                  <span className="span"></span>
                  <Button>Delete</Button>
                </TableData>
              </TableRow>
            </Table>
          </div>
        </div>
      </>
    );
  }
}

export default Sentences;
