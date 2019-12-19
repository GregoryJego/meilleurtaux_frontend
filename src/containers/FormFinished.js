import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Title from "../components/Title";
import ErrorMsg from "../components/ErrorMsg";

export default function FormFinished({ userData, setActualStep }) {
  // The actual step is step 8
  setActualStep(8);

  // fileNumber will be used to retrieve the value sent by the server
  const [fileNumber, setFileNumber] = useState();

  // error will be used to store the error message
  const [error, setError] = useState("");

  useEffect(() => {
    const sendData = async () => {
      if (userData) {
        console.log("userData existe bien");
        try {
          console.log("On essaie d'envoyer les données");
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
          const result = await axios.post(
            "http://localhost:3000/estimate/create",
            formattedData
          );
          setFileNumber(result.data);
          Cookies.remove("userData");
        } catch (e) {
          console.log("Une erreur s'est produite");
          console.log(e.message);
          setError(e.message);
        }
      } else setError("Veuillez recommencer");
    };
    sendData();
  }, [userData]);

  return (
    <div className="container">
      {error === "" ? (
        <>
          <Title label="ET VOILÀ, LE FORMULAIRE EST TERMINÉ !" />
          <p>
            Votre numéro de dossier est le :
            {fileNumber && (
              <span style={{ fontWeight: "800" }}> {fileNumber}</span>
            )}
          </p>
        </>
      ) : (
        <>
          <Title label="OUPS ! UNE ERREUR S'EST PRODUITE, VEUILLEZ RECOMMENCER" />
          {ErrorMsg(error)}
          <Link
            to={`/step1`}
            style={{
              marginTop: "2rem",
              borderRadius: 35,
              width: 100,
              textDecoration: "none",
              padding: ".5rem 1rem",
              display: "flex",
              justifyContent: "center",
              color: "var(--white)",
              cursor: "pointer",
              backgroundColor: "var(--orange)"
            }}
            onClick={() => {
              Cookies.remove("userData");
            }}
          >
            RECOMMENCER
          </Link>
        </>
      )}
    </div>
  );
}
