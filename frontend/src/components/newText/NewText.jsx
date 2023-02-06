import React, { useEffect, useState } from "react";

import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
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
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";
import CheckButton from "../checkButton/CheckButton";

const NewText = () => {
  const [title, setTitle] = useState("");
  const [categoriesNameList, setCategoriesNameList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState({
    editorState: EditorState.createEmpty(),
  });

  useEffect(() => {
    const getGategories = async () => {
      const provNameList = [];
      const res = await axios.get("/categories");

      for (let i = 0; i < res.data.length; i++) {
        provNameList.push(res.data[i].name);
      }

      setCategoriesNameList(provNameList);
    };
    getGategories();
  }, []);

  const handleCategories = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(typeof value === "string" ? value.split(",") : value);
  };

  const handleEditorStateChange = (editorState) => {
    setState({
      editorState,
    });
  };

  const { editorState } = state;

  const parsedState = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );

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

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <FormControl
          sx={{ m: 2, backgroundColor: "#e4e4e4" }}
          variant="outlined"
        >
          <InputLabel>Título</InputLabel>
          <OutlinedInput
            type={"text"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Titulo"
            sx={{width:500}}
          />
        </FormControl>
        <Paper sx={{ backgroundColor: "#e4e4e4" }}>
          <FormControl sx={{ m: 4, width: 220 }}>
            <InputLabel>Categorias</InputLabel>
            <Select
              multiple
              label="Categorias"
              value={categories}
              onChange={handleCategories}
              renderValue={(selected) => selected.join(", ")}
            >
              {categoriesNameList.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  <Checkbox checked={categories.indexOf(cat) > -1} />
                  <ListItemText primary={cat} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>
        <Typography sx={{ color: "#fff" }}>Georgia, 24</Typography>

        <FormControl
          sx={{ m: 4, width: "90%", backgroundColor: "#fff" }}
          variant="outlined"
        >
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={handleEditorStateChange}
          />
        </FormControl>

        <CheckButton />
      </Grid>
    </form>
  );
};

export default NewText;
