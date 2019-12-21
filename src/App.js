import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";

// To use Cookies
import Cookies from "js-cookie";

// The global CSS file
import "./App.css";

// Header
import Header from "./components/Header";

// Containers
import KindOfProperty from "./containers/KindOfProperty";
import StateOfProperty from "./containers/StateOfProperty";
import UseOfProperty from "./containers/UseOfProperty";
import CurrentSituation from "./containers/CurrentSituation";
import PropertyLocation from "./containers/PropertyLocation";
import ProjectAmount from "./containers/ProjectAmount";
import ContactDetails from "./containers/ContactDetails";
import FormFinished from "./containers/FormFinished";
import AdminLogin from "./containers/AdminLogin";
import Admin from "./containers/Admin";

// Footer
import Footer from "./components/Footer";

export default function App() {
  // redirection is used to redirect the user if he has already started filling out the form
  // By default, the user is redirected to step 1
  let redirection = "/step1";

  // We try to get the cookie named "UserData" (front office)
  const userDataCookie = Cookies.get("userData");

  // We try to get the cookie named "token" (back office)
  const tokenCookie = Cookies.get("token");

  // transformUserDataCookie is used to transform a string (the cookie UserDate) into a JSON object
  let transformUserDataCookie;
  if (userDataCookie) {
    transformUserDataCookie = JSON.parse(userDataCookie);
    if (Object.keys(transformUserDataCookie).length < 7)
      redirection = "/step" + (Object.keys(transformUserDataCookie).length + 1);
    else redirection = "/step1";
  }
  // in this case, there is no data saved
  else transformUserDataCookie = null;

  // actualStep is used to find out which step the user is at (not the furthest step he went to)
  const [actualStep, setActualStep] = useState();

  // userData is used to store all the information entered by the user
  const [userData, setUserData] = useState(transformUserDataCookie);

  // token is used to keep the administrator logged in
  const [token, setToken] = useState(tokenCookie);

  // choiceSelected is used to indicate the current choice made by the user
  const [choiceSelected, setChoiceSelected] = useState();

  // isBackOffice is used to find out if the user is on the back office
  const [isBackOffice, setIsBackOffice] = useState(false);

  return (
    <Router>
      <Header isBackOffice={isBackOffice} token={token} />
      <Switch>
        <Route exact path="/admin/infos">
          <Admin
            setIsBackOffice={setIsBackOffice}
            token={token}
            setToken={setToken}
          />
        </Route>
        <Route exact path="/admin">
          <AdminLogin setIsBackOffice={setIsBackOffice} setToken={setToken} />
        </Route>
        <Route exact path="/step8">
          <FormFinished
            setActualStep={setActualStep}
            userData={userData}
            setIsBackOffice={setIsBackOffice}
          />
        </Route>
        <Route exact path="/step7">
          <ContactDetails
            setActualStep={setActualStep}
            userData={userData}
            setChoiceSelected={setChoiceSelected}
            setIsBackOffice={setIsBackOffice}
          />
        </Route>
        <Route exact path="/step6">
          <ProjectAmount
            setActualStep={setActualStep}
            userData={userData}
            choiceSelected={choiceSelected}
            setChoiceSelected={setChoiceSelected}
            setIsBackOffice={setIsBackOffice}
          />
        </Route>
        <Route exact path="/step5">
          <PropertyLocation
            setActualStep={setActualStep}
            userData={userData}
            choiceSelected={choiceSelected}
            setChoiceSelected={setChoiceSelected}
            setIsBackOffice={setIsBackOffice}
          />
        </Route>
        <Route exact path="/step4">
          <CurrentSituation
            setActualStep={setActualStep}
            userData={userData}
            choiceSelected={choiceSelected}
            setChoiceSelected={setChoiceSelected}
            setIsBackOffice={setIsBackOffice}
          />
        </Route>
        <Route exact path="/step3">
          <UseOfProperty
            setActualStep={setActualStep}
            userData={userData}
            choiceSelected={choiceSelected}
            setChoiceSelected={setChoiceSelected}
            setIsBackOffice={setIsBackOffice}
          />
        </Route>
        <Route exact path="/step2">
          <StateOfProperty
            setActualStep={setActualStep}
            userData={userData}
            choiceSelected={choiceSelected}
            setChoiceSelected={setChoiceSelected}
            setIsBackOffice={setIsBackOffice}
          />
        </Route>
        <Route exact path="/step1">
          <KindOfProperty
            setActualStep={setActualStep}
            userData={userData}
            choiceSelected={choiceSelected}
            setChoiceSelected={setChoiceSelected}
            setIsBackOffice={setIsBackOffice}
          />
        </Route>
        {/* home page redirect the user to step1 if he has not started filling out the form, otherwise to the current step */}
        <Redirect from="/" to={redirection} />
        {/* In case the user tries to access another page */}
        <Route
          render={() => (
            <div className="container">
              <h2 style={{ color: "var(--orange)" }}>
                Erreur 404 : Cette page n'existe pas
              </h2>
            </div>
          )}
        />
      </Switch>
      <Footer
        actualStep={actualStep}
        setActualStep={setActualStep}
        userData={userData}
        setUserData={setUserData}
        choiceSelected={choiceSelected}
        setChoiceSelected={setChoiceSelected}
        isBackOffice={isBackOffice}
      />
    </Router>
  );
}
