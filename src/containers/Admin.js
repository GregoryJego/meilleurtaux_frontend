import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Title from "../components/Title";
import axios from "axios";
import { Delete, Refresh } from "@material-ui/icons";
import NumberWithSpaces from "../functions/NumberWithSpaces";
import Modal from "../components/Modal";
import LineHeader from "../components/LineHeader";

export default function Admin({ setIsBackOffice, token, setToken }) {
  const [results, setResults] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [typeOfModal, setTypeOfModal] = useState();
  const [estimateId, setEstimateId] = useState();

  // We are on the Back Office
  setIsBackOffice(true);

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
        {token && (
          <>
            <Link
              to={`/admin`}
              onClick={() => {
                setToken();
              }}
            >
              Se déconnecter
            </Link>
            <div
              className="flexcenter"
              style={{
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
                      <LineHeader />
                      {results.map(result => {
                        return (
                          <div key={result._id} className="line">
                            <div
                              className="lineLeft"
                              style={{
                                flex: 9
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
                                    result.location
                                      .split("(")[1]
                                      .replace(")", "")
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
          </>
        )}
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
