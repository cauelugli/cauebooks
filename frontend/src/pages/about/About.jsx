import * as React from 'react';
import { CardContent, Box, Typography } from "@mui/material";

export default function About() {
  return (
    <>
      <div>
        <Box
          sx={{
            display: 'block',
            p: 1,
            m: 1,
            color: 'grey.800',
            border: '1px solid',
            margin: '1% 5% 5% 5%',
            borderColor: 'grey.300',
            borderRadius: 2,
            fontWeight: '700',
          }}
        >
          <CardContent>
            <Typography component="div">
              <Box sx={{
                fontStyle: 'italic',
                color: "text.secondary",
              }}
              >
                "Pescador de ilusões. Todos nós somos."
              </Box>
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                textAlign: "justify",
                margin: "2%"
              }}
            >
              <img style={{ width: "30%" }} src={window.location.origin + '/adventurer.png'} alt="adventurer" />

              <Typography sx={{ padding: '6%', lineHeight: 1.8, fontSize: '150%' }}>
                Porque a ideia é ser feito por ele, e nessa frase mora todo o propósito disto aqui.
                "Por que a ideia...": tem que virar a ação.
                "...é ser feito...": pois há o fato de fazer por fazer.
                "por ele.": quem é ele?
                <strong> Caue Lugli dos Milagres,</strong> ou simplesmente <strong>Caue, pokamassa, c4aum, Cau, Picuruta,</strong> você quem escolhe...
                Eu sou teu espelho. Eu sirvo pra te mostrar um reflexo dos teus próprios pensamentos.
                Pois assim tu me ensinas a enxergar a vida. E eu te retribuo, meu parceiro.
                Muitas coisas vão fazer sentido, mas nem todas.
                O importante é que estaremos juntos. No final de tudo, rindo do que aconteceu.
                Muita energia!
              </Typography>
            </Box>
          </CardContent>
        </Box>
      </div>
    </>
  );
}
