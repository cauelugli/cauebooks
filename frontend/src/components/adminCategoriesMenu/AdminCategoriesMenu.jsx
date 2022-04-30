import React, { useState } from "react";

import {
  Checkbox,
  FormControl,
  Paper,
  Select,
  MenuItem,
  ListItemText,
  InputLabel
} from "@mui/material";

const categoriesList = [
  "Natureza",
  "Ser Humano",
  "Sociedade",
  "Família",
  "Pessoal",
  "Filosofia",
  "Tecnologia",
  "Brisas Fortes",
  "Esportes",
  "É um Erro",
];

export default function MultipleSelectCheckmarks() {
  const [categories, setCategories] = useState([]);

  const handleCategories = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(categories)
  };

  return (
    <Paper variant="outlined">
      <FormControl sx={{ m: 4, width: 400 }}>
        <InputLabel>Categorias</InputLabel>
        <Select
          multiple
          label="Categorias"
          value={categories}
          onChange={handleCategories}
          renderValue={(selected) => selected.join(', ')}
        >
          {categoriesList.map((cat) => (
            <MenuItem key={cat} value={cat}>
              <Checkbox checked={categories.indexOf(cat) > -1} />
              <ListItemText primary={cat} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}



