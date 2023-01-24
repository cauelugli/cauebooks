import React, { useState } from "react";

import axios from "axios";

import { InputLabel, OutlinedInput, FormControl, Button } from "@mui/material";

export default function Admin() {
  const [name, setName] = useState("");

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/categories", {
        name
      });
      res.data && alert("Nova Categoria adicionada!");
    } catch (err) {
      alert("Vish, não rolou a nova categoria não...");
      console.log(err);
    }
  };

  return (
    <div className="admin">
      <div className="adminWrapper">
        <form className="adminForm" onSubmit={handleCategorySubmit}>
          <FormControl
            sx={{ m: 4, width: "80%", backgroundColor: "#e4e4e4" }}
            variant="outlined"
          >
            <InputLabel>Nome</InputLabel>
            <OutlinedInput
              type={"text"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Nome"
            />
          </FormControl>

          <Button
            sx={{ color: "#0E1428", backgroundColor: "#BDEFD8" }}
            type="submit"
          >
            VAI KE VAI!
          </Button>
        </form>
      </div>
    </div>
  );
}
