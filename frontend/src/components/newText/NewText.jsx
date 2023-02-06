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
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";
import CheckButton from "../checkButton/CheckButton";

const NewText = () => {
  const [title, setTitle] = useState("");
  const [categoriesNameList, setCategoriesNameList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [state, setState] = useState({
    editorState: EditorState.createEmpty(),
  });

  useEffect(() => {
    const getGategories = async () => {
      const provNameList = [];
      const res = await axios.get("/categories");
      setCategories(res.data)

      for (let i = 0; i < res.data.length; i++) {
        provNameList.push(res.data[i].name);
      }

      setCategoriesNameList(provNameList);
    };
    getGategories();
  }, []);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
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
        categories: selectedValue,
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
            sx={{ width: 500 }}
          />
        </FormControl>
        <Paper sx={{ backgroundColor: "#e4e4e4" }}>
          <FormControl sx={{ m: 4, width: 220 }}>
            <InputLabel>Categorias</InputLabel>
            <Select
              multiple
              labelId="select-label"
              id="select"
              value={selectedValue}
              onChange={handleChange}
            >
              {categories.map((object) => (
                <MenuItem key={object.name} value={object}>
                  {object.name}
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
