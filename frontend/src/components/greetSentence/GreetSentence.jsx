import React from "react";

import { Typography } from "@mui/material";

export default function GreetSentence() {
  const randomGreet = () => {
    const rand = 1 + Math.random() * 14;
    const ran = rand.toString()[0];
    if (ran === "1") {
      return "Dahora";
    }
    if (ran === "2") {
      return "Show";
    }
    if (ran === "3") {
      return "Massa Véi";
    }
    if (ran === "4") {
      return "Firmeza";
    }
    if (ran === "5") {
      return "Classe A";
    }
    if (ran === "6") {
      return "Pode pa";
    }
    if (ran === "7") {
      return "É nois";
    }
    if (ran === "8") {
      return "Fechou";
    }
    if (ran === "9") {
      return "Valeu";
    }
    if (ran === "10") {
      return "Tu é o Cara";
    }
    if (ran === "11") {
      return "Fecho Parsa";
    }
    if (ran === "12") {
      return "Fala que é Noi";
    }
    if (ran === "13") {
      return "Valeu Tru";
    }
    if (ran === "14") {
      return "Nais";
    }
  };

  return (<Typography>{randomGreet()}</Typography>);
}
