import * as React from 'react';
import Box from '@mui/material/Box';
import { CardContent, Paper, Typography } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";

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
            padding: '2%',
            margin: '5%',
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
                m: 1
              }}
              >
                "Pescador de ilusões. Todos nós somos."
              </Box>
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "4%"
              }}
            >
              <img style={{ width: "40%" }} src={window.location.origin + '/adventurer.png'} alt="adventurer" />
            </Box>
            <Typography>
              Porque a ideia é ser feito por ele, e nessa frase mora todo o propósito disto aqui. 
              "Por que a ideia...": tem que virar a ação. 
              "...é ser feito...": pois há o fato de fazer por fazer.
              "por ele.": quem é ele?

              Caue Lugli dos Milagres, ou simplesmente Caue, pokamassa, c4aum, Cau, Picuruta, você quem escolhe...

              Eu sou teu espelho. Eu sirvo pra te mostrar um reflexo dos teus próprios pensamentos.

              Pois assim tu me ensinas a enxergar a vida. E eu te retribuo, meu parceiro.

              Muitas coisas vão fazer sentido, mas nem todas.

              O importante é que estaremos juntos. No final de tudo, rindo do que aconteceu.

              Muita energia!
              
            </Typography>
          </CardContent>
        </Box>
        <Sidebar />
      </div>
    </>
  );
}
