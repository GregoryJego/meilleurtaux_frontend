import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Prev({ actualStep, setChoiceSelected }) {
  return (
    <div
      style={{
        width: 300,
        display: "flex",
        justifyContent: "flex-start"
      }}
    >
      {actualStep > 1 && (
        <Link
          style={{
            cursor: "pointer",
            color: "var(--black)"
          }}
          to={`/step${actualStep - 1}`}
        >
          <p
            onClick={() => {
              // Wze reinitialize the choiceSelected
              setChoiceSelected();
            }}
            style={{
              textDecoration: "underline"
            }}
          >
            Précédent
          </p>
        </Link>
      )}
    </div>
  );
}
