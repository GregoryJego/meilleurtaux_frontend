import React from "react";
import "../App.css";
import Title from "../components/Title";
import CheckBox from "../components/CheckBox";

export default function Estimate({ userSteps }) {
  const step = userSteps.actualStep;
  console.log(userSteps);
  const steps = [
    { title: "TYPE DE BIEN", choices: ["MAISON", "APPARTEMENT"] },
    { title: "ETAT DU BIEN", choices: ["ANCIEN", "NEUF"] },
    {
      title: "USAGE DU BIEN",
      choices: [
        "RÉSIDENCE PRINCIPALE",
        "RÉSIDENCE SECONDAIRE",
        "INVESTISSEMENT LOCATIF"
      ]
    },
    {
      title: "VOTRE SITUATION ACTUELLE",
      choices: [
        "LOCATAIRE",
        "PROPRIÉTAIRE",
        "BÉNÉFICIAIRE D'UN LOGEMENT DE FONCTION",
        "HÉBERGÉ À TITRE GRATUIT"
      ]
    },
    {
      title: "OÙ SE SITUE LE BIEN À FINANCER ?"
    },
    {
      title: "DÉFINISSONS LE MONTANT DE VOTRE PROJET",
      inputs: [
        "Montant estimé de votre acquisition*",
        "Montant estimé des travaux",
        "Frais de notaire*"
      ]
    },
    {
      title: "VOS COORDONNÉES",
      inputs: ["Adresse e-mail emprunteur*"]
    },
    {
      title: "ET VOILÀ, LE FORMULAIRE EST TERMINÉ !"
    }
  ];

  return (
    <div className="container">
      <Title label={steps[step - 1].title} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        {steps[step - 1].choices &&
          steps[step - 1].choices.map(choice => {
            return (
              <>
                <CheckBox label={choice} key={choice} />
                <span style={{ width: "1rem" }} />
              </>
            );
          })}
      </div>
    </div>
  );
}
