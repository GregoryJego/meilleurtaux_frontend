import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import KindOfProperty from "./containers/KindOfProperty";
import StateOfProperty from "./containers/StateOfProperty";
import UseOfProperty from "./containers/UseOfProperty";
import CurrentSituation from "./containers/CurrentSituation";
import PropertyLocation from "./containers/PropertyLocation";
import ProjectAmount from "./containers/ProjectAmount";
import ContactDetails from "./containers/ContactDetails";
import FormFinished from "./containers/FormFinished";
import Admin from "./containers/Admin";

import Cookies from "js-cookie";

import "./App.css";

export default function App() {
  // We will initialize the step state from what is in the cookies
  // The `step` state will be used to save where the user is
  const userDataCookie = Cookies.get("userData");
  let transformUserDataCookie;
  if (userDataCookie) transformUserDataCookie = JSON.parse(userDataCookie);
  else transformUserDataCookie = null;
  const [actualStep, setActualStep] = useState();
  const [userData, setUserData] = useState(transformUserDataCookie);
  const [choiceSelected, setChoiceSelected] = useState();

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route exact path="/step8">
          <FormFinished setActualStep={setActualStep} userData={userData} />
        </Route>
        <Route exact path="/step7">
          <ContactDetails
            setActualStep={setActualStep}
            userData={userData}
            choiceSelected={choiceSelected}
            setChoiceSelected={setChoiceSelected}
          />
        </Route>
        <Route exact path="/step6">
          <ProjectAmount
            setActualStep={setActualStep}
            userData={userData}
            choiceSelected={choiceSelected}
            setChoiceSelected={setChoiceSelected}
          />
        </Route>
        <Route exact path="/step5">
          <PropertyLocation
            setActualStep={setActualStep}
            userData={userData}
            choiceSelected={choiceSelected}
            setChoiceSelected={setChoiceSelected}
          />
        </Route>
        <Route exact path="/step4">
          <CurrentSituation
            setActualStep={setActualStep}
            userData={userData}
            choiceSelected={choiceSelected}
            setChoiceSelected={setChoiceSelected}
          />
        </Route>
        <Route exact path="/step3">
          <UseOfProperty
            setActualStep={setActualStep}
            userData={userData}
            choiceSelected={choiceSelected}
            setChoiceSelected={setChoiceSelected}
          />
        </Route>
        <Route exact path="/step2">
          <StateOfProperty
            setActualStep={setActualStep}
            userData={userData}
            choiceSelected={choiceSelected}
            setChoiceSelected={setChoiceSelected}
          />
        </Route>
        <Route exact path="/step1">
          <KindOfProperty
            setActualStep={setActualStep}
            userData={userData}
            choiceSelected={choiceSelected}
            setChoiceSelected={setChoiceSelected}
          />
        </Route>
        {/* <Route exact path="/">
          {<Home /> ? (
            <Home />
          ) : (
            <Redirect
              to={
                <KindOfProperty
                  setActualStep={setActualStep}
                  userData={userData}
                  choiceSelected={choiceSelected}
                  setChoiceSelected={setChoiceSelected}
                />
              }
            />
          )}
        </Route> */}
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
      />
    </Router>
  );
}
