import React, { useState, useEffect } from "react";
import "../App.css";
import Title from "../components/Title";
import axios from "axios";

export default function Admin() {
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container">
      <Title label="Espace d'administration" />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ backgroundColor: "blue", flex: 1 }}>
          <div
            className="button"
            onClick={async () => {
              console.log("C'est cliqué");
              try {
                setIsLoading(true);
                const response = await axios.get(
                  "http://localhost:3000/estimate"
                );
                console.log(typeof response.data.estimates);
                console.log(response.data.estimates);
                if (response.data.estimates.length)
                  setResult(response.data.estimates);
                else setResult("Aucune donnée en Base de données");
              } catch (e) {
                console.log("Une erreur s'est produite");
                setResult(e.message);
              }
              setIsLoading(false);
            }}
          >
            Relancer
          </div>
        </div>
        <div style={{ backgroundColor: "red", flex: 2 }}>
          {isLoading ? (
            <div className="flexcenter">
              <div className="loader"></div>
            </div>
          ) : (
            <div>{result}</div>
          )}
        </div>
      </div>
    </div>
  );
}
