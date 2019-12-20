import React, { useState, useEffect } from "react";
import "../App.css";
import Title from "../components/Title";
import axios from "axios";
import { Delete, Refresh } from "@material-ui/icons";
import NumberWithSpaces from "../functions/NumberWithSpaces";
import Modal from "../components/Modal";

export default function Admin() {
  const [results, setResults] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [typeOfModal, setTypeOfModal] = useState();
  const [estimateId, setEstimateId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://meilleurtaux-backend-gj.herokuapp.com/estimate"
        );
        if (response.data.estimates.length) setResults(response.data.estimates);
        else setResults();
      } catch (e) {
        console.log("Une erreur s'est produite");
        setResults();
      }
      setIsLoading(false);
    };

    if (refresh) {
      fetchData();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <>
      <div className="container">
        <Title label="Espace d'administration" />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem 0rem"
          }}
        >
          <p
            style={{
              fontWeight: "800",
              fontSize: 24,
              flex: 1
            }}
          >
            Résultats :
          </p>
          <div
            className="button"
            style={{ width: "100px" }}
            onClick={() => {
              setRefresh(true);
            }}
          >
            <Refresh />
          </div>
        </div>
        <div>
          {isLoading ? (
            <div className="flexcenter">
              <div className="loader"></div>
            </div>
          ) : (
            <div>
              {results ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      height: "80px",
                      backgroundColor: "var(--orange)",
                      color: "black",
                      borderBottom: "1px solid black",
                      borderTop: "1px solid black"
                    }}
                  >
                    <div
                      style={{
                        flex: 9,
                        display: "flex",
                        flexDirection: "row",
                        height: "80px",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center"
                      }}
                    >
                      <p
                        style={{
                          flex: 1,
                          borderLeft: "1px solid black",
                          padding: "1rem",
                          height: "60%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        Code postal
                      </p>
                      <p
                        style={{
                          flex: 3,
                          height: "60%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderLeft: "1px solid black",
                          padding: "1rem"
                        }}
                      >
                        Email
                      </p>
                      <p
                        style={{
                          flex: 2,
                          height: "60%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderLeft: "1px solid black",
                          padding: "1rem"
                        }}
                      >
                        Type de bien
                      </p>
                      <p
                        style={{
                          flex: 1,
                          borderLeft: "1px solid black",
                          padding: "1rem",
                          height: "60%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        Etat du bien
                      </p>
                      <p
                        style={{
                          flex: 2,
                          borderLeft: "1px solid black",
                          padding: "1rem",
                          height: "60%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        Budget total
                      </p>
                    </div>
                    <p
                      style={{
                        flex: 1,
                        borderLeft: "1px solid black",
                        borderRight: "1px solid black",
                        padding: "1rem",
                        height: "60%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      Supprimer
                    </p>
                  </div>
                  {results.map(result => {
                    return (
                      <div
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          backgroundColor: "white",
                          width: "100%",
                          borderBottom: "3px solid var(--grey)"
                        }}
                      >
                        <div
                          style={{
                            flex: 9,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center"
                          }}
                          onClick={() => {
                            setEstimateId(result._id);
                            setTypeOfModal("display");
                          }}
                        >
                          <p
                            style={{
                              borderLeft: "1px solid var(--grey)",
                              padding: "1rem",
                              flex: 1
                            }}
                          >
                            {NumberWithSpaces(
                              Number(
                                result.location.split("(")[1].replace(")", "")
                              )
                            )}
                          </p>
                          <p
                            style={{
                              borderLeft: "1px solid var(--grey)",
                              padding: "1rem",
                              flex: 3,
                              textAlign: "justify"
                            }}
                          >
                            {result.email}
                          </p>
                          <p
                            style={{
                              borderLeft: "1px solid var(--grey)",
                              padding: "1rem",
                              flex: 2
                            }}
                          >
                            {result.type}
                          </p>
                          <p
                            style={{
                              borderLeft: "1px solid var(--grey)",
                              padding: "1rem",
                              flex: 1
                            }}
                          >
                            {result.state}
                          </p>
                          <p
                            style={{
                              borderLeft: "1px solid var(--grey)",
                              padding: "1rem",
                              flex: 2
                            }}
                          >
                            {NumberWithSpaces(result.totalBudget)} €
                          </p>
                        </div>
                        <Delete
                          style={{
                            flex: 1,
                            borderLeft: "1px solid var(--grey)",
                            borderRight: "1px solid var(--grey)",
                            padding: "1rem"
                          }}
                          onClick={() => {
                            setEstimateId(result._id);
                            setTypeOfModal("delete");
                          }}
                        />
                      </div>
                    );
                  })}
                </>
              ) : (
                <p style={{ color: "grey", fontStyle: "italic" }}>
                  Aucune donnée disponible
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      {typeOfModal && (
        <Modal
          setTypeOfModal={setTypeOfModal}
          typeOfModal={typeOfModal}
          id={estimateId}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
}
