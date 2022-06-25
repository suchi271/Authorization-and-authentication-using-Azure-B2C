/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";

// import { MsalProvider, useMsal } from "@azure/msal-react";
import { EventType, InteractionType } from "@azure/msal-browser";
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

import { b2cPolicies } from "./authConfig";
import { PageLayout } from "./components/PageLayout";
import { Hello } from "./pages/Hello";

import "./styles/App.css";
import Home from "./pages/home";
import Start from "./pages/start";
import Category from "./pages/category";
import HomeBeforeLogin from "./pages/homebeforelogin";
import Navbar from "./components/Navbar";

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
          <h5><center>Welcome to Connect Aid</center></h5>
          <br/>
          {/* <Router>
          <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/home" element={<Home />}></Route>
              <Route exact path="/category" element={<Category />}></Route>
              <Route exact path="/sentences" element={<Sentences />}></Route>
              <Route exact path="/profiles" element={<Profiles />}></Route>
              <Route exact path="/generateText" element={<GenerateText />}></Route>
          </Routes>
          </Router> */}
          {/* {idTokenClaims ?
              <IdTokenClaims idTokenClaims={idTokenClaims} />
              :
              <Button variant="secondary" onClick={GetIdTokenClaims}>View ID Token Claims</Button>
          } */}
      </>
  );
};

const Pages = () => {

  /**
   * useMsal is hook that returns the PublicClientApplication instance, 
   * an array of all accounts currently signed in and an inProgress value 
   * that tells you what msal is currently doing. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { instance } = useMsal();

  /**
   * Using the event API, you can register an event callback that will do something when an event is emitted. 
   * When registering an event callback in a react component you will need to make sure you do 2 things.
   * 1) The callback is registered only once
   * 2) The callback is unregistered before the component unmounts.
   * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/events.md
   */
  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      if (event.eventType === EventType.LOGIN_FAILURE) {
        if (event.error && event.error.errorMessage.indexOf("AADB2C90118") > -1) {
          if (event.interactionType === InteractionType.Redirect) {
            instance.loginRedirect(b2cPolicies.authorities.forgotPassword);
          } else if (event.interactionType === InteractionType.Popup) {
            instance.loginPopup(b2cPolicies.authorities.forgotPassword)
              .catch(e => {
                return;
              });
          }
        }
      }

      if (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
        if (event?.payload) {
          /**
           * We need to reject id tokens that were not issued with the default sign-in policy.
           * "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr").
           * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
           */
          if (event.payload.idTokenClaims["acr"] === b2cPolicies.names.forgotPassword) {
            window.alert("Password has been reset successfully. \nPlease sign-in with your new password.");
            return instance.logout();
          } else if (event.payload.idTokenClaims["acr"] === b2cPolicies.names.editProfile) {
            window.alert("Profile has been edited successfully. \nPlease sign-in again.");
            return instance.logout();
          }
        }
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, []);

  return (
    // <Switch>
    //   <Route path="/hello">
    //     <Hello />
    //   </Route>
    // </Switch>
    <div className="App">
            <AuthenticatedTemplate>
                {/* <IdTokenContent /> */}
                <Start />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <br/>
                <h5><center>Welcome to Connect Aid</center></h5>
                <br/>
                <h5 className="card-title">Please login to proceed to application</h5>
                <HomeBeforeLogin/>
            </UnauthenticatedTemplate>
    </div>
  )
}

const App = ({ instance }) => {
  return (
    <Router>
      <MsalProvider instance={instance}>
        <Navbar />
          <Pages />
        {/* </PageLayout> */}
      </MsalProvider>
    </Router>
  );
}

export default App;