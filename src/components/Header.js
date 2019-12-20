import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/images/logo.jpg";

export default function Header({ actualStep }) {
  return (
    <>
      {actualStep <= 8 && (
        <>
          <div className="container">
            <div>
              <Link to={`/step1`}>
                <img src={logo} alt="Logo" />
              </Link>
              <p>Crédit Immobilier: 5 mn pour obtenir le meilleur taux</p>
            </div>
          </div>
          <hr />
        </>
      )}
    </>
  );
}
