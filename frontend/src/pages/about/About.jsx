import * as React from "react";

import { CardContent, Box, Typography } from "@mui/material";

export default function About() {
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
              textAlign: "justify",
              margin: "3%",
            }}
          >
            <img
              className="aboutImg"
              src={window.location.origin + "/adventurer.png"}
              alt="adventurer"
            />

            <div>
              <Typography
                sx={{ ml: "3%", mr: "3%", lineHeight: 1.8, fontSize: "125%" }}
              >
                Porque a ideia é ser feito por ele. E nessa frase mora todo o
                propósito disto aqui.
              </Typography>

              <Typography
                sx={{
                  ml: "3%",
                  mr: "3%",
                  mb: "3%",
                  lineHeight: 1.8,
                  fontSize: "125%",
                }}
              >
                Mas afinal, quem é ele, quem é? Alguém sabe quem convidou?
              </Typography>

              <Typography
                sx={{ ml: "3%", mr: "3%", lineHeight: 1.8, fontSize: "125%" }}
              >
                <strong> Caue Lugli dos Milagres,</strong> ou simplesmente{" "}
                <strong>Caue, pokamassa, c4aum, Cau, Picuruta,</strong> você
                quem escolhe...
              </Typography>

              <Typography sx={{ m: "3%", lineHeight: 1.8, fontSize: "125%" }}>
                Eu sou teu espelho. Eu sirvo pra te mostrar um reflexo dos teus
                próprios pensamentos.
              </Typography>

              <Typography
                sx={{ margin: "3%", lineHeight: 1.8, fontSize: "125%" }}
              >
                Pois assim tu me ensinas a enxergar a vida. E eu te retribuo,
                meu parceiro.
              </Typography>

              <Typography
                sx={{ margin: "3%", lineHeight: 1.8, fontSize: "125%" }}
              >
                Muitas coisas farão sentido, <strong>mas nem todas</strong> :)
              </Typography>

              <Typography
                sx={{ margin: "3%", lineHeight: 1.8, fontSize: "125%" }}
              >
                O importante é que estaremos juntos no final de tudo, e rindo do
                que aconteceu.
              </Typography>

              <Typography
                sx={{ margin: "3%", lineHeight: 1.8, fontSize: "125%" }}
              >
                Muita energia!
              </Typography>
            </div>
          </Box>
        </CardContent>
      </Box>
    </Box>
  );
}
