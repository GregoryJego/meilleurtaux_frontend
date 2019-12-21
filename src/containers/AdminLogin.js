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

  useEffect(() => {
    setError("");
  }, [input]);

  useEffect(() => {
    if (password) {
      const abortController = new AbortController();
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const result = await axios.post(
            "https://meilleurtaux-backend-gj.herokuapp.com/admin/login",
            { password: password }
          );
          // Status === 200 => success
          if (result.status === 200) {
            setToken(result.data.token);
            Cookies.set("token", result.data.token);
            history.push("/admin/infos");
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginLeft: "1rem"
          }}
        >
          <p>Mot de passe</p>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <input
              style={{
                height: 24,
                fontFamily: "Oswald",
                fontWeight: "800",
                fontSize: 16
              }}
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
