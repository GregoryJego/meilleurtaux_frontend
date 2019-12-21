import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

// Delete and Refresh icons
import { Delete, Refresh } from "@material-ui/icons";

// The function to add spaces every thousands for numbers
import NumberWithSpaces from "../functions/NumberWithSpaces";

// Components
import Modal from "../components/Modal";
import Title from "../components/Title";
import LineHeader from "../components/LineHeader";

// To use axios
import axios from "axios";

// To use Cookies
import Cookies from "js-cookie";

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
        if (response.data.estimates.length) {
          setResults(response.data.estimates);
        } else setResults();
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
        {token ? (
          <>
            <Link
              to={`/admin`}
              onClick={() => {
                setToken();
                Cookies.remove("token");
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
                                className="blgrey"
                                style={{
                                  flex: 1
                                }}
                              >
                                {NumberWithSpaces(
                                  result.location.split("(")[1].replace(")", "")
                                )}
                              </p>
                              <p
                                className="blgrey"
                                style={{
                                  flex: 3,
                                  textAlign: "justify"
                                }}
                              >
                                {result.email}
                              </p>
                              <p
                                className="blgrey"
                                style={{
                                  flex: 2
                                }}
                              >
                                {result.type}
                              </p>
                              <p
                                className="blgrey"
                                style={{
                                  flex: 1
                                }}
                              >
                                {result.state}
                              </p>
                              <p
                                className="blgrey"
                                style={{
                                  flex: 2
                                }}
                              >
                                {result.totalBudget} €
                              </p>
                            </div>
                            <Delete
                              className="blgrey"
                              style={{
                                flex: 1,
                                borderRight: "1px solid var(--grey)"
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
        ) : (
          <Link to={`/admin`} className="button">
            Se connecter
          </Link>
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
