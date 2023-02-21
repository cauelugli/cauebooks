import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      p={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10%",
        marginBottom: "1%",
        pt:"30%"
      }}
    >
      <hr
        style={{  width: "7%", marginBottom: "0.5%" }}
      />
      <Typography
      fontSize="small"
      sx={{ color: "#9f9f9f", fontFamily: "Varela Round, sans-serif" }}
      >
        OUR ROOTS
      </Typography>
      <Typography
        fontSize="small"
        sx={{ color: "#9f9f9f", fontFamily: "Varela Round, sans-serif" }}
      >
        RUN DEEPER
      </Typography>
      <hr
        style={{
          width: "7%",
          marginTop: "0.5%",
          marginBottom: "0.5%",
        }}
      />

      <Typography
        sx={{ fontStyle: "oblique", marginBottom: "0.5%", color: "#9f9f9f" }}
      >
        4c
      </Typography>
    </Box>
  );
}
