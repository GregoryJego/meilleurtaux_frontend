import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Cookies from "js-cookie";

export default function Next({
  label,
  actualStep,
  setActualStep,
  userData,
  setUserData,
  choiceSelected,
  setChoiceSelected,
  error
}) {
  // the variables below are used to activate and disactivate the Next button
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // If a choice has been made and we aren't at the final step, so we activate the Next button
    if (choiceSelected && actualStep < 8) setIsActive(true);
    // Otherwise the Next button is disactivated (= it doesn't appear)
    else setIsActive(false);
  }, [choiceSelected, actualStep]);

  return (
    <div
      style={{
        width: 300,
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      {isActive && (
        <Link
          to={error === "" && `/step${actualStep + 1}`}
          className="button"
          style={{ backgroundColor: error !== "" && "var(--grey)" }}
          onClick={() => {
            // If there is no error
            if (error === "") {
              // newUserData will be used to store the new value
              let newUserData = {};
              // name will be the name of the value according to the step
              let name;
              // Does userData exist?
              if (userData) {
                // the user has just returned to the website, so the cookie is of type string, so it needs to be transforms into a JSON object
                if (typeof userData === "string")
                  newUserData = JSON.parse(userData);
                // the user was already on the website, so userData is already of type JSON object
                else newUserData = userData;
              }
              // All the possible values of name according to the step
              switch (actualStep) {
                case 1:
                  name = "type";
                  break;
                case 2:
                  name = "state";
                  break;
                case 3:
                  name = "use";
                  break;
                case 4:
                  name = "situation";
                  break;
                case 5:
                  name = "location";
                  break;
                case 6:
                  name = "budget";
                  break;
                case 7:
                  name = "email";
                  break;
                default:
                  name = "";
              }
              // newUserData will receive the new value chosen
              newUserData[name] = choiceSelected;
              // we save the data
              setUserData(newUserData);
              // we update the value of the step
              setActualStep(actualStep + 1);
              // we reset the choice
              setChoiceSelected();
              // we save the data in the cookies
              Cookies.set("userData", newUserData);
            }
          }}
        >
          <p>{label}</p>
        </Link>
      )}
    </div>
  );
}
