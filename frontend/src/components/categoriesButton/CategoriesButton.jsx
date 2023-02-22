import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Grid, Link, Menu, MenuItem } from "@mui/material";

const CategoriesButton = () => {
  const [categoriesNamesList, setCategoriesNamesList] = useState([]);
  const [categoriesIdsList, setCategoriesIdsList] = useState([]);
  const [categoriesIconsList, setCategoriesIconsList] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getGategories = async () => {
      const provNameList = [];
      const ids = [];
      const icons = [];
      const res = await axios.get("/categories");

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
        <MenuItem
          sx={{
            px: 1,
            color: "#BDEFD8",
            backgroundColor: "#0E1428",
          }}
        >
          <Link
            href={`/categories/${categoriesIdsList[i]}`}
            underline="none"
            sx={{ color: "#BDEFD8", backgroundColor: "#0E1428", mx: 1 }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html:
                  "&#" + categoriesIconsList[i] + "; " + categoriesNamesList[i],
              }}
            />
          </Link>
        </MenuItem>
      </>
    );
  }

  return (
    <Grid container justifyContent="center" sx={{my:1}}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="large"
        sx={{ color: "#BDEFD8", backgroundColor: "#0E1428", borderRadius: "0 10px 0 10px", }}
      >
        CATEGORIAS
      </Button>
      <Menu
        id="basic-menu"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Grid
          container
          justifyContent="center"
          sx={{ width: "185px", color: "#BDEFD8", backgroundColor: "#0E1428" }}
        >
          {categoriesList}
        </Grid>
      </Menu>
    </Grid>
  );
};

export default CategoriesButton;
