import React, { useState, useEffect } from "react";
import "../App.css";

export default function LineHeader() {
  return (
    <div className="lineHeader">
      <div
        className="lineLeft"
        style={{
          flex: 9,
          height: "80px"
        }}
      >
        <p className="case" style={{ flex: 1 }}>
          Code postal
        </p>
        <p
          className="case"
          style={{
            flex: 3
          }}
        >
          Email
        </p>
        <p
          className="case"
          style={{
            flex: 2
          }}
        >
          Type de bien
        </p>
        <p
          className="case"
          style={{
            flex: 1
          }}
        >
          Etat du bien
        </p>
        <p
          className="case"
          style={{
            flex: 2
          }}
        >
          Budget total
        </p>
      </div>
      <p
        className="case"
        style={{
          flex: 1,
          borderRight: "1px solid black"
        }}
      >
        Supprimer
      </p>
    </div>
  );
}
