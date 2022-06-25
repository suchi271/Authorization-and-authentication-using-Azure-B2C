import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { NavigationBar } from "../NavigationBar";

// import { Button, Dropdown, DropdownButton} from "react-bootstrap";
// import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

// const { instance } = useMsal();

// const handleLogin = () => {
//   instance.loginPopup(loginRequest)
//       .catch((error) => console.log(error))
// }

const Navbar = (props) => {
  return (
    <>
      <nav class="navbar">
        <div class="navbar-container container">
          <input type="checkbox" name="checkbox" id="checkbox" />
          <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </div>
          <ul class="menu-items">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/category">Category</Link>
            </li>
            <li>
              <Link to="/sentences">Sentences</Link>
            </li>
            <li>
              <Link to="/profiles">Profiles</Link>
            </li>
            <li>
              <Link to="/generatetext">Generate Text</Link>
            </li>
            <li>
              {/* <Link to="/login">Login</Link> */}
              {/* <Button onClick={handleLogin}>Sign in</Button> */}
              <NavigationBar />
            </li>
          </ul>
          <h1 class="logo">Connect Aid</h1>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
