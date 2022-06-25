import React from "react";
import { useState } from "react";
import "./index.css";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

const IdTokenContent = () => {
  /**
   * useMsal is hook that returns the PublicClientApplication instance, 
   * an array of all accounts currently signed in and an inProgress value 
   * that tells you what msal is currently doing. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { accounts } = useMsal();
  const [idTokenClaims, setIdTokenClaims] = useState(null);

  function GetIdTokenClaims() {
      setIdTokenClaims(accounts[0].idTokenClaims)
  }

  return (
      <>
          {/* <h5 className="card-title">Hello {accounts[0].name}!</h5> */}
          {/* <header className="App-header">
              <p>Hello, {accounts[0].name}!</p>
          </header> */}
          <br/>
          <h5 className="card-title"><center>Hello, {accounts[0].name}!</center></h5>
          <br/>
          <h5 className="card-title"><center>Welcome to Connect Aid</center></h5>
          <br/>
          
          {/* {idTokenClaims ?
              <IdTokenClaims idTokenClaims={idTokenClaims} />
              :
              <Button variant="secondary" onClick={GetIdTokenClaims}>View ID Token Claims</Button>
          } */}
      </>
  );
};

export default function Home() {
  const [category, setIsShown] = useState(false);
  const [sentence, setIsShown2] = useState(false);
  const [profile, setIsShown3] = useState(false);
  const [generate, setIsShown4] = useState(false);

  const handleClick = (event) => {
    if (event.target.id === "category-card") {
      setIsShown(!category);
      setIsShown2(false);
      setIsShown3(false);
      setIsShown4(false);
    } else if (event.target.id === "sentence-card") {
      setIsShown2(!sentence);
      setIsShown(false);
      setIsShown3(false);
      setIsShown4(false);
    } else if (event.target.id === "profile-card") {
      setIsShown3(!profile);
      setIsShown2(false);
      setIsShown(false);
      setIsShown4(false);
    } else if (event.target.id === "generatetext-card") {
      setIsShown4(!generate);
      setIsShown2(false);
      setIsShown3(false);
      setIsShown(false);
    }
  };
  return (
    <>
      {/* <header className="App-header">
        <p>Hello, Name!</p>
        <p>Welcome to Connect Aid.</p>
      </header> */}
      {/* <IdTokenContent /> */}
      <div className="card-container">
        <div className="category-card card">
          <div className="card-header">
            <a href="#info-category" id="category-card" onClick={handleClick}>
              Create Category
            </a>
          </div>
        </div>
        <div className="sentence-card card">
          <div className="card-header">
            <a href="#info-sentences" id="sentence-card" onClick={handleClick}>
              Add Sentences
            </a>
          </div>
        </div>

        <div className="profile-card card">
          <div className="card-header">
            <a href="#info-profiles" id="profile-card" onClick={handleClick}>
              Create Profiles
            </a>
          </div>
        </div>
        <div className="generatetext-card card">
          <div className="card-header">
            <a
              href="#info-generatetext"
              id="generatetext-card"
              onClick={handleClick}
            >
              Generate Summaries
            </a>
          </div>
        </div>
      </div>

      <div className="info-container" id="info">
        {category && <div className="info-category" id="info-category"></div>}
        {sentence && <div className="info-sentences" id="info-sentences"></div>}
        {profile && <div className="info-profiles" id="info-profiles"></div>}
        {generate && (
          <div className="info-generatetext" id="info-generatetext"></div>
        )}
      </div>
    </>
  );
}
