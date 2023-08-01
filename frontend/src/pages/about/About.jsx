import React from "react";

import { CardContent, Box, Typography, useMediaQuery } from "@mui/material";

export default function About() {
  const isLargeScreen = useMediaQuery("(min-width:1087px)");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "1%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0E1428",
          border: "3px solid",
          backgroundColor: "#f1f1f0e3",
          borderColor: "grey.400",
          borderRadius: 3,
          width: "85%",
        }}
      >
        <CardContent>
          <Typography
            sx={{
              fontStyle: "italic",
              color: "grey.800",
              margin: "1%",
            }}
          >
            "Pescador de ilusões. Todos nós somos."
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              margin: "3%",
            }}
          >
            {isLargeScreen && (
              <img
                style={{ width: "25%" }}
                src={window.location.origin + "/adventurer.png"}
                alt="adventurer"
              />
            )}
            <Typography
              sx={{ ml: "3%", mr: "3%", lineHeight: 1.8, fontSize: "125%" }}
            >
              <strong> Caue Lugli dos Milagres,</strong> ou simplesmente{" "}
              <strong>Caue, pokamassa, c4aum, Cau, Picuruta,</strong> você quem
              escolhe... Eu sou teu espelho. Eu sirvo pra te mostrar um reflexo
              dos teus próprios pensamentos. Pois é assim que tu me ensina a enxergar
              a vida, e eu te retribuo, parceria. Muitas coisas farão sentido,{" "}
              <strong>mas nem todas</strong> :) O mais importante é que estaremos aqui.
              Muita energia!
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Box>
  );
}
