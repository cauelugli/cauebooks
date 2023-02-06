import React, { useState } from "react";

import axios from "axios";

import {
  FormControl,
  TextField,
  Grid,
} from "@mui/material";

import CheckButton from "../../components/checkButton/CheckButton";

export default function Admin() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/categories", {
        name,
        icon,
      });
      res.data && alert("Nova Categoria adicionada!");
    } catch (err) {
      alert("Vish, não rolou a nova categoria não...");
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleCategorySubmit}>
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <FormControl
          sx={{ p: 2, width: "80%", backgroundColor: "#e4e4e4" }}
          variant="outlined"
        >
          <TextField
            margin="normal"
            type={"text"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nome"
          />
          <TextField
            type={"text"}
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            label="Icone"
          />
        </FormControl>

        <CheckButton />
      </Grid>
    </form>
  );
}
