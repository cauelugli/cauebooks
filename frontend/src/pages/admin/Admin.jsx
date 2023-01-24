import React, { useEffect, useState } from "react";

import axios from "axios";

import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";

import NewCategory from "../../components/newCategory/NewCategory";

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
  Menu,
} from "@mui/material";



export default function Admin() {
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const parsedState = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );

  return (
    <div className="admin">
      <div className="adminWrapper">
        <>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ color: "#0E1428", backgroundColor: "#BDEFD8" }}
          >
            Nova Categoria
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <NewCategory />
          </Menu>
        </>

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
                {categoriesNameList.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    <Checkbox checked={categories.indexOf(cat) > -1} />
                    <ListItemText primary={cat} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>

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

          <Button
            sx={{ color: "#BDEFD8", backgroundColor: "#0E1428" }}
            type="submit"
          >
            DALHE!
          </Button>
        </form>
      </div>
    </div>
  );
}
