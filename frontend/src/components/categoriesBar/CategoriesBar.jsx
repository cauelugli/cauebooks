import React, { useEffect, useState } from "react";
import axios from "axios";

import { AppBar, FormControl, Link, Toolbar, Typography } from "@mui/material";

const api = axios.create({
  baseURL: (process.env.DEV_API_URL || "https://api.cauebooks.com.br/api"),
});

const CategoriesBar = () => {
  const [categoriesNamesList, setCategoriesNamesList] = useState([]);
  const [categoriesIdsList, setCategoriesIdsList] = useState([]);
  const [categoriesIconsList, setCategoriesIconsList] = useState([]);

  useEffect(() => {
    const getGategories = async () => {
      const provNameList = [];
      const ids = [];
      const icons = [];
      const res = await api.get("/categories");

      for (let i = 0; i < res.data.length; i++) {
        provNameList.push(res.data[i].name);
        ids.push(res.data[i]._id);
        icons.push(res.data[i].icon);
      }

      setCategoriesNamesList(provNameList);
      setCategoriesIdsList(ids);
      setCategoriesIconsList(icons);
    };
    getGategories();
  }, []);

  const categoriesList = [];

  for (let i = 0; i < categoriesNamesList.length; i++) {
    categoriesList.push(
      <>
        <FormControl
          sx={{
            minWidth: "5%",
            color: "#BDEFD8",
            backgroundColor: "#0E1428",
          }}
        >
          <Link
            href={`/categories/${categoriesIdsList[i]}`}
            underline="none"
            sx={{ fontSize:"95%", color: "#BDEFD8", backgroundColor: "#0E1428", mx: 1 }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "&#" + categoriesIconsList[i] + "; " + categoriesNamesList[i],
              }}
            />
          </Link>
        </FormControl>
      </>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          color: "#BDEFD8",
          backgroundColor: "#0E1428",
          fontFamily: "Lora, sans-serif",
        }}
      >
        <Typography variant="h6" sx={{ mr: 1 }}>
          Categorias
        </Typography>
        {categoriesList}
      </Toolbar>
    </AppBar>
  );
};

export default CategoriesBar;
