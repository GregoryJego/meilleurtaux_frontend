import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Title from "../components/Title";
import ErrorMsg from "../components/ErrorMsg";

export default function FormFinished({
  userData,
  setUserData,
  setActualStep,
  setIsBackOffice
}) {
  const [isLoading, setIsLoading] = useState(true);

  // The actual step is step 8
  setActualStep(8);

  // We are on the Front Office
  setIsBackOffice(false);

  // fileNumber will be used to retrieve the value sent by the server
  const [fileNumber, setFileNumber] = useState();

  // error will be used to store the error message
  const [error, setError] = useState("");

  useEffect(() => {
    const sendData = async () => {
      // Does userData exist ?
      if (userData) {
        try {
          const formattedData = {
            type: userData.type,
            state: userData.state,
            use: userData.use,
            situation: userData.situation,
            location: userData.location,
            propertyAmount: Number(userData.budget.split("-")[0]),
            worksAmount: Number(userData.budget.split("-")[1]),
            notaryFees: Number(userData.budget.split("-")[2]),
            totalBudget: Number(userData.budget.split("-")[3]),
            email: userData.email
          };
          // We try to send the data
          const result = await axios.post(
            "https://meilleurtaux-backend-gj.herokuapp.com/estimate/create",
            formattedData
          );
          // We get the fileNumber
          setFileNumber(result.data);
          // We remove the cookie
          Cookies.remove("userData");
          // We reinitialize userData
          setUserData();
        } catch (e) {
          console.log(e.message);
          setError("les données n'ont pas pu être envoyées");
        }
      }
      // We stop the loading
      setIsLoading(false);
    };
    sendData();
  }, [userData, setUserData]);

  return (
    <div className="container">
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <>
          {error === "" && fileNumber ? (
            <>
              <Title label="ET VOILÀ, LE FORMULAIRE EST TERMINÉ !" />
              <p>
                Votre numéro de dossier est le :
                {fileNumber && (
                  <span style={{ fontWeight: "800", marginLeft: "1rem" }}>
                    {fileNumber}
                  </span>
                )}
              </p>
              <p
                style={{
                  textDecoration: "underline",
                  marginTop: "2rem",
                  fontSize: 12
                }}
              >
                Mentions légales
              </p>
            </>
          ) : (
            <>
              <Title label="OUPS ! UNE ERREUR S'EST PRODUITE, VEUILLEZ RECOMMENCER" />
              {ErrorMsg(error)}
              <Link
                to={`/step1`}
                className="button"
                style={{
                  marginTop: "2rem"
                }}
                onClick={() => {
                  Cookies.remove("userData");
                }}
              >
                RECOMMENCER
              </Link>
            </>
          )}
        </>
      )}
    </div>
  );
}
