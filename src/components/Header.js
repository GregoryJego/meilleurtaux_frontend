import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../assets/images/logo.jpg";
import { Info } from "@material-ui/icons";

export default function Header({ isBackOffice, token }) {
  return (
    <>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <img src={logo} alt="Logo" />
            <p>Crédit Immobilier : 5 mn pour obtenir le meilleur taux</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Link
              style={{
                display: "flex"
              }}
              to={isBackOffice ? `/` : token ? `/admin/infos` : `/admin`}
            >
              <Info />
              {isBackOffice ? (
                <p>Retourner sur le Front-Office</p>
              ) : (
                <p>Accéder au Back-Office</p>
              )}
            </Link>
          </div>
        </div>
      </div>
      <hr style={{ borderBottom: "1px solid var(--grey)" }} />
    </>
  );
}
