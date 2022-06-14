import React, { useState } from "react";

import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import axios from "axios";
import { Editor } from "react-draft-wysiwyg";

import {
  InputLabel,
  OutlinedInput,
  FormControl,
  Paper,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";

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
  const [state, setState] = useState({editorState: EditorState.createEmpty()});

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
        body: parsedState,
        categories,
      });
      res.data && alert("niceru!");
    } catch (err) {
      alert("Vish, deu não...");
      console.log(err);
    }
  };

  const handleEditorStateChange = (editorState) => {
    setState({
      editorState,
    });
  };

  const { editorState } = state;

  const parsedState = draftToHtml(convertToRaw(editorState.getCurrentContent()))

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
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={handleEditorStateChange}
            />
          </FormControl>

          <Button
            sx={{ color: "#BDEFD8", backgroundColor: "#0E1428" }}
            type="submit"
          >
            DALHE!
          </Button>
        </form>
        <Button
          sx={{ color: "#BDEFD8", backgroundColor: "#0E1428" }}
          onClick={() => console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
        >
          SHOW ME THE TEXT!
        </Button>
      </div>
    </div>
  );
}
