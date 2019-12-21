import React from "react";
import "../App.css";

export default function ModalInfoleftCol() {
  const infos = [
    "Numéro de dossier :",
    "Type de bien :",
    "Etat du bien :",
    "Usage du bien :",
    "Localisation du bien :",
    "Situation actuelle :",
    "Adresse email :",
    "Montant du bien :",
    "Montant des travaux :",
    "Frais de notaire :",
    "Budget total"
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1
      }}
    >
      {infos.map(info => {
        return (
          <p
            key={info}
            style={{
              color: "var(--orange2)"
            }}
          >
            {info}
          </p>
        );
      })}
    </div>
  );
}
