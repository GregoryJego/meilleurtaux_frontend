import React, { useState, useEffect } from "react";
import "../App.css";
import Title from "../components/Title";
import EmailInput from "../components/EmailInput";
import ErrorMsg from "../components/ErrorMsg";
import Image from "../assets/images/visuel-desktop-email.jpg";

export default function ContactDetails({
  setActualStep,
  userData,
  setChoiceSelected,
  setIsBackOffice,
  error,
  setError
}) {
  // The actual step is step 7
  setActualStep(7);

  // We are on the Front Office
  setIsBackOffice(false);

  const [email, setEmail] = useState();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Does userData exist ?
    if (userData) {
      if (userData.email) {
        // If yes, we get the stored value : "email" for step 7
        setEmail(userData.email);
        // the checkbox is set to true
        setIsChecked(true);
      }
    }
  }, [userData]);

  useEffect(() => {
    // Does the email exist
    if (email) {
      // We check if the email looks like a real email
      if (
        email.indexOf("@") === -1 ||
        email.indexOf("@") === 0 ||
        email.indexOf("@") === email.length - 1 ||
        email.indexOf(".") === -1 ||
        email.indexOf(".") === 0 ||
        email.indexOf(".") === email.length - 1
      )
        setError("Veuillez entrer une adresse email valide");
      else {
        // we reinitialize the error message
        setError("");
        if (isChecked) setChoiceSelected(email);
        else setChoiceSelected();
      }
    } else {
      setError("");
      setChoiceSelected();
    }
  }, [email, isChecked, setChoiceSelected, setError]);

  return (
    <div className="container">
      <Title label="VOS COORDONNÉES" />
      <div className="boxcontainer">
        <div className="orangebox">
          Un devis vous sera envoyé par mail avec un récapitulatif de votre
          demande.
        </div>
        <img src={Image} alt="Desktop" />
      </div>
      <EmailInput
        label="Adresse e-mail emprunteur*"
        value={email}
        setValue={setEmail}
      />
      {ErrorMsg(error)}
      <div className="checkcontainer">
        <input
          type="checkbox"
          style={{
            marginRight: ".5rem"
          }}
          checked={isChecked}
          onChange={() => {
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
