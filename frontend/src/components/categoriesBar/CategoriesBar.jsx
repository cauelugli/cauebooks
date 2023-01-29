import React, { useEffect, useState } from "react";
import axios from "axios";

import { AppBar, FormControl, Link, Toolbar, Typography } from "@mui/material";

const CategoriesBar = () => {
  const [categoriesNameList, setCategoriesNameList] = useState([]);
  const [categoriesIdsList, setCategoriesIdsList] = useState([]);

  useEffect(() => {
    const getGategories = async () => {
      const provNameList = [];
      const ids = [];
      const res = await axios.get("/categories");
      console.log("res.data", res.data);

      for (let i = 0; i < res.data.length; i++) {
        provNameList.push(res.data[i].name);
        ids.push(res.data[i]._id);
      }

      setCategoriesNameList(provNameList);
      setCategoriesIdsList(ids);
    };
    getGategories();
  }, []);

  const categoriesList = [];

  for (let i = 0; i < categoriesNameList.length; i++) {
    categoriesList.push(
      <>
        <FormControl
          sx={{
            minWidth: "5%",
            px:1,
            color: "#BDEFD8",
            backgroundColor: "#0E1428",
          }}
        >
          <Link href={`/categories/${categoriesIdsList[i]}`} underline="none" sx={{ color: "#BDEFD8", backgroundColor: "#0E1428", mx:1 }}>
              <div
                dangerouslySetInnerHTML={{ __html: categoriesNameList[i] }}
              />
          </Link>
        </FormControl>
      </>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ color: "#BDEFD8", backgroundColor: "#0E1428", fontFamily: "Lora, sans-serif" }}>
        <Typography variant="h6" sx={{ mr: 1 }}>
          Categorias
        </Typography>
        {categoriesList}
      </Toolbar>
    </AppBar>
  );
};

export default CategoriesBar;
