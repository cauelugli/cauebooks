import * as React from "react";

import { CardContent, Box, Typography } from "@mui/material";

export default function About() {
  return (
    <>
      <div>
        <Box
          sx={{
            display: "block",
            color: "grey.800",
            border: "1px solid",
            margin: "2%",
            borderColor: "grey.400",
            borderRadius: 2,
            fontWeight: "700",
          }}
        >
          <CardContent>
            <Typography
              sx={{
                fontStyle: "italic",
                color: "grey.600",
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
                margin: "2%",
              }}
            >
              <img
                className="aboutImg"
                src={window.location.origin + "/adventurer.png"}
                alt="adventurer"
              />

              <div id="text">
                <Typography sx={{ margin: "3%", lineHeight: 1.8, fontSize: "125%" }}>
                  Porque a ideia é ser feito por ele, e nessa frase mora todo o
                  propósito disto aqui. Mas afinal, quem é ele?
                </Typography>

                <Typography
                  sx={{ margin: "3%", lineHeight: 1.8, fontSize: "125%" }}
                >
                  <strong> Caue Lugli dos Milagres,</strong> ou simplesmente{" "}
                  <strong>Caue, pokamassa, c4aum, Cau, Picuruta,</strong> você
                  quem escolhe... Eu sou teu espelho. Eu sirvo pra te mostrar um
                  reflexo dos teus próprios pensamentos.
                </Typography>

                <Typography
                  sx={{ margin: "3%", lineHeight: 1.8, fontSize: "125%" }}
                >
                  Pois assim tu me ensinas a enxergar a vida. E eu te retribuo,
                  meu parceiro. Muitas coisas farão sentido, mas nem todas.
                </Typography>

                <Typography
                  sx={{ margin: "3%", lineHeight: 1.8, fontSize: "125%" }}
                >
                  O importante é que estaremos juntos no final de tudo, e rindo
                  do que aconteceu.
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
      </div>
    </>
  );
}
