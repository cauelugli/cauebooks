import React, {
  // useContext,
  useState,
} from "react";

import axios from "axios";

import {
  InputLabel,
  OutlinedInput,
  FormControl,
  // Button,
  // Box,
  Paper,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

// import { Context } from "../../context/Context";
// import AdminParagraph from "../../components/adminParagraph/AdminParagraph";

const categoriesList = [
  "É um Erro",
  "Esportes",
  "Família",
  "Filosofia",
  "Natureza",
  "Pessoal",
  "Ser Humano",
  "Sociedade",
  "Tecnologia",
  "Brisas Fortes",
];

export default function Admin() {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [body, setBody] = useState("");

  const handleCategories = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/posts", {
        title,
        body,
        categories,
      });
      res.data && alert("niceru!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin">
      <div className="adminWrapper">
        <form className="adminForm" onSubmit={handleSubmit}>
          <FormControl
            sx={{ m: 4, width: "50%", backgroundColor: "#e4e4e4" }}
            variant="outlined"
          >
            <InputLabel>Título</InputLabel>
            <OutlinedInput
              type={"text"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Titulo"
            />
          </FormControl>
          <Paper sx={{ backgroundColor: "#e4e4e4" }}>
            <FormControl sx={{ m: 4, width: 400 }}>
              <InputLabel>Categorias</InputLabel>
              <Select
                multiple
                label="Categorias"
                value={categories}
                onChange={handleCategories}
                renderValue={(selected) => selected.join(", ")}
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
          <FormControl
            sx={{ m: 4, width: "50%", backgroundColor: "#e4e4e4" }}
            variant="outlined"
          >
            <InputLabel>Paragraphs</InputLabel>
            <OutlinedInput
              type={"text"}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              label="Paragraphs"
            />
          </FormControl>
          <button className="registerSubmit" type="submit">DALHE!</button>
        </form>
      </div>
    </div>
  );
}
