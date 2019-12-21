import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

import DeleteEstimate from "../functions/DeleteEstimate";
import ModalInfoLeftCol from "../components/ModalInfoLeftCol";

export default function Modal({ typeOfModal, setTypeOfModal, id, setRefresh }) {
  const [results, setResults] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async id => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://meilleurtaux-backend-gj.herokuapp.com/estimate/${id}`
        );
        setResults(response.data.estimate);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    fetchData(id);
  }, [id]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height:
          document.body.scrollHeight > window.screen.height
            ? document.body.scrollHeight
            : window.screen.height,
        backgroundColor: "rgba(0, 0, 0, 0.8)"
      }}
      onClick={() => {
        setTypeOfModal();
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            padding: "2rem",
            alignItems: "center",
            borderRadius: 50,
            width: "60vw",
            position: "relative"
          }}
        >
          <p
            style={{
              position: "absolute",
              top: "1rem",
              right: "3rem",
              color: "var(--orange)",
              fontSize: 24,
              fontWeight: "800",
              cursor: "pointer"
            }}
            onClick={() => {
              setTypeOfModal();
            }}
          >
            X
          </p>
          {typeOfModal === "delete" && (
            <>
              <p
                style={{
                  color: "var(--orange)",
                  fontWeight: "800",
                  fontSize: 22,
                  padding: "2rem"
                }}
              >
                SUPPRESSION
              </p>
              <p>Voulez-vous vraiment supprimer cette estimation ?</p>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  padding: "2rem"
                }}
              >
                <div
                  className="button"
                  onClick={() => {
                    DeleteEstimate(id);
                    setRefresh(true);
                    setTypeOfModal();
                  }}
                >
                  Oui
                </div>
                <div
                  className="button"
                  onClick={() => {
                    setTypeOfModal();
                  }}
                >
                  Non
                </div>
              </div>
            </>
          )}
          {typeOfModal === "display" && (
            <>
              <p
                style={{
                  color: "var(--orange)",
                  fontWeight: "800",
                  fontSize: 22,
                  padding: "2rem"
                }}
              >
                INFORMATIONS
              </p>
              {isLoading ? (
                <div className="loader" />
              ) : (
                <>
                  {results && (
                    <div
                      style={{
                        display: "flex",
                        width: "100%"
                      }}
                    >
                      {/* Colonne de gauche */}
                      <ModalInfoLeftCol />
                      {/* Colonne de droite */}
                      <div
                        style={{
                          display: "flex",
                          flex: 2,
                          flexDirection: "column"
                        }}
                      >
                        <p>{results.fileNumber}</p>
                        <p>{results.type}</p>
                        <p>{results.state}</p>
                        <p>{results.use}</p>
                        <p>{results.location}, France</p>
                        <p>{results.situation}</p>
                        <p>{results.email}</p>
                        <p>{results.propertyAmount} €</p>
                        <p>{results.worksAmount} €</p>
                        <p>{results.notaryFees} €</p>
                        <p>{results.totalBudget} €</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
