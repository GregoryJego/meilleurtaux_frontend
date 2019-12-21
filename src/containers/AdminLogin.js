import React, { useState, useEffect } from "react";
import "../App.css";
import Title from "../components/Title";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorMsg from "../components/ErrorMsg";

// To use Cookies
import Cookies from "js-cookie";

export default function AdminLogin({ setIsBackOffice, setToken, token }) {
  // Initialization of the error message
  const [error, setError] = useState("");
  const [input, setInput] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();

  if (token) history.push("/admin/infos");

  // We are on the Back Office
  setIsBackOffice(true);

  // We reinitialize the error message when the input changes
  useEffect(() => {
    setError("");
  }, [input]);

  useEffect(() => {
    // Does password exist?
    if (password) {
      const abortController = new AbortController();
      // The loading begins
      setIsLoading(true);
      // Function to fetch data
      const fetchData = async () => {
        try {
          const result = await axios.post(
            "https://meilleurtaux-backend-gj.herokuapp.com/admin/login",
            { password: password }
          );
          // Status === 200 => so, it is a success
          if (result.status === 200) {
            setToken(result.data.token);
            // We save the token
            Cookies.set("token", result.data.token);
            // We go to admin/infos page
            history.push("/admin/infos");
            // We clean
            return function cleanup() {
              abortController.abort();
            };
          }
        } catch (e) {
          if (e.response.status === 401) setError("Mot de passe incorrect");
          else setError(e.message);
        }
        setIsLoading(false);
      };
      fetchData();
    }
  }, [password, history, setToken]);

  return (
    <div className="container">
      <Title label="Espace d'administration" />
      <p style={{ marginBottom: "2rem", fontSize: 18 }}>
        Veuillez entrer un mot de passe pour accéder à l'espace d'administration
      </p>
      <div style={{ display: "flex" }}>
        <div className="adminloginbox">
          <p>Mot de passe</p>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <input
              className="input"
              placeholder="Password"
              onChange={event => {
                setInput(event.target.value);
              }}
            />
            {isLoading ? (
              <div
                className="flexcenter"
                style={{
                  width: "100px",
                  marginLeft: "1rem"
                }}
              >
                <div className="loader"></div>
              </div>
            ) : (
              <div
                className="button"
                style={{
                  marginLeft: "1rem",
                  backgroundColor:
                    error === "" ? "var(--orange)" : "var(--grey)"
                }}
                onClick={() => {
                  if (error === "") setPassword(input);
                }}
              >
                Valider
              </div>
            )}
          </div>
          {ErrorMsg(error)}
        </div>
      </div>
    </div>
  );
}
