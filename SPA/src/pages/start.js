import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./home";
import Category from "./category";
import Sentences from "./sentences";
import Profiles from "./profiles";
import GenerateText from "./generateText";

function Start() {
  return (
    <div className="App">
      {/* <Router> */}
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/category" element={<Category />}></Route>
          <Route exact path="/sentences" element={<Sentences />}></Route>
          <Route exact path="/profiles" element={<Profiles />}></Route>
          <Route exact path="/generateText" element={<GenerateText />}></Route>
        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default Start;
