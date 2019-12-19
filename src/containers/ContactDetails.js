import React, { useState, useEffect } from "react";
import "../App.css";
import Title from "../components/Title";
import EmailInput from "../components/EmailInput";
import ErrorMsg from "../components/ErrorMsg";
import Image from "../assets/images/visuel-desktop-email.jpg";

export default function ContactDetails({
  setActualStep,
  userData,
  choiceSelected,
  setChoiceSelected
}) {
  // The actual step is step 7
  setActualStep(7);

  const [email, setEmail] = useState();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Does userData exist ?
    if (userData) {
      // If yes, we get the stored value : "email" for step 7
      setEmail(userData.email);
      setIsChecked(true);
    }
  }, [userData]);

  const [error, setError] = useState("");

  useEffect(() => {
    if (email) {
      if (
        email.indexOf("@") === -1 ||
        email.indexOf("@") === 0 ||
        email.indexOf("@") === email.length - 1 ||
        email.indexOf(".") === -1 ||
        email.indexOf(".") === 0 ||
        email.indexOf(".") === email.length - 1
      )
        //   console.log("La position de @ est : " + choiceSelected.indexOf("@"));
        // console.log("La position de . est : " + choiceSelected.indexOf("."));
        setError("Veuillez entrer une adresse email valide");
      else {
        setError("");
        if (isChecked) setChoiceSelected(email);
        else setChoiceSelected();
      }
    } else {
      setError("");
      setChoiceSelected();
    }
  }, [email, isChecked, setChoiceSelected]);

  return (
    <div className="container">
      <Title label="VOS COORDONNÉES" />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "1rem"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--orange)",
            color: "var(--white)",
            padding: "1rem",
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            maxWidth: "20%",
            height: 190
          }}
        >
          Un devis vous sera envoyé par mail avec un récapitulatif de votre
          demande.
        </div>
        <img src={Image} alt="Desktop" style={{ flex: 0.2 }} />
      </div>
      <EmailInput
        label="Adresse e-mail emprunteur*"
        value={email}
        setValue={setEmail}
      />
      {ErrorMsg(error)}
      <div
        style={{
          display: "flex",
          marginTop: "1rem",
          paddingLeft: "1rem"
        }}
      >
        <input
          type="checkbox"
          style={{
            marginRight: ".5rem"
          }}
          value={isChecked}
          checked={isChecked}
          onClick={() => {
            setIsChecked(!isChecked);
          }}
        />
        <p style={{ fontSize: 12 }}>
          J'accepte de recevoir par email des propositions de Meilleurtaux.
        </p>
      </div>
    </div>
  );
}