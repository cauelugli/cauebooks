import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  AppBar,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";

const CategoriesBar = () => {
  const [categoriesNameList, setCategoriesNameList] = useState([]);

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

  const categoriesList = [];

  for (let i = 0; i < categoriesNameList.length; i++) {
    categoriesList.push(
      <>
        <FormControl
          sx={{
            minWidth: "8%",
            color: "#BDEFD8",
            backgroundColor: "#0E1428",
          }}
        >
          <InputLabel
            sx={{ color: "#BDEFD8", backgroundColor: "#0E1428" }}
            htmlFor="grouped-select"
          >
            <div dangerouslySetInnerHTML={{ __html: categoriesNameList[i] }} />
          </InputLabel>
          <Select
            sx={{ color: "#BDEFD8", backgroundColor: "#0E1428" }}
            id="grouped-select"
            label="Grouping"
          >
            <ListSubheader sx={{ m: 1 }}>Most Recent</ListSubheader>
            <MenuItem value={0} sx={{ m: 1 }}>
              {categoriesNameList[i]}
            </MenuItem>
            <ListSubheader sx={{ m: 1 }}>Most Liked</ListSubheader>
          </Select>
        </FormControl>
      </>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ color: "#BDEFD8", backgroundColor: "#0E1428" }}>
        <Typography variant="h6" sx={{ mr: 1 }}>
          Categorias
        </Typography>
        {categoriesList}
      </Toolbar>
    </AppBar>
  );
};

export default CategoriesBar;
