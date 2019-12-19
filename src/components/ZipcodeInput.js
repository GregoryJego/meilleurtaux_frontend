import React, { useState, useEffect } from "react";
import "../App.css";
import ErrorMsg from "../components/ErrorMsg";

const axios = require("axios");

export default function ZipcodeInput({
  label,
  choiceSelected,
  setChoiceSelected
}) {
  const [zipcode, setZipcode] = useState("");
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (choiceSelected) setZipcode(choiceSelected);
  }, [choiceSelected]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://vicopo.selfbuild.fr/cherche/${zipcode}`
        );
        if (!response.data.cities.length)
          setError("Ville ou code postal non trouvé");
        else setError("");
        setCities(response.data.cities);
      } catch (e) {
        setError(e);
      }
      setIsLoading(false);
    };

    // First, we check if there are at least 2 characters, and if the zipcode is different from the one stored
    if (zipcode.length > 1 && zipcode !== choiceSelected) {
      // We initialize the error at: "No error" which can be translated by an empty string
      setError("");
      // zipcode is a string. In this case, there is no limit, no maximum number of characters
      if (isNaN(zipcode)) fetchData();
      // zipcode is a number
      // First, we check if the zipcode isn't too long
      else if (zipcode.length <= 5) fetchData();
      // In this case, the zipcode is too long, so we update the error message
      else setError("Le code postal doit être composé de 5 chiffres");
    }
    // we re-initialize the cities to display to an empty array
    else setCities([]);
  }, [zipcode, choiceSelected]);

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: ".5rem"
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          height: 34,
          alignItems: "center"
        }}
      >
        <p>{label}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
        <input
          name="zipcode"
          type="text"
          value={zipcode}
          onChange={event => setZipcode(event.target.value)}
          placeholder="Entrez un code postal ou une ville"
          style={{
            width: 300,
            height: 24,
            fontFamily: "Oswald",
            fontWeight: "800",
            fontSize: 18,
            padding: 5,
            border: "1px solid var(--orange)",
            borderBottom: "3px solid var(--orange)"
          }}
        />
        {ErrorMsg(error)}
        {cities.length ? (
          <ul
            style={{
              height: 100,
              width: 300,
              border: "1px solid var(--grey)",
              overflow: "auto",
              backgroundColor: "white"
            }}
          >
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <div className="loader"></div>
              </div>
            ) : (
              <>
                {cities.map(city => {
                  return (
                    <li
                      value={city.city}
                      key={city.city + city.code}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setZipcode(`${city.city} (${city.code})`);
                        setCities("");
                        setChoiceSelected(`${city.city} (${city.code})`);
                      }}
                    >
                      {city.city} ({city.code})
                    </li>
                  );
                })}
              </>
            )}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
