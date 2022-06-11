import React, { useState } from "react";

import {
  AppBar,
  IconButton,
  Menu,
  // MenuItem,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BathtubIcon from "@mui/icons-material/Bathtub";
import ComputerIcon from "@mui/icons-material/Computer";
import DangerousIcon from "@mui/icons-material/Dangerous";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import GroupIcon from "@mui/icons-material/Group";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import SpaIcon from "@mui/icons-material/Spa";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const CategoriesBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // axios get list of recent on each category

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

  const categoriesIcons = [
    <DangerousIcon sx={{ mx: 1 }} />,
    <SportsSoccerIcon sx={{ mx: 1 }} />,
    <FamilyRestroomIcon sx={{ mx: 1 }} />,
    <AccountBalanceIcon sx={{ mx: 1 }} />,
    <SpaIcon sx={{ mx: 1 }} />,
    <NaturePeopleIcon sx={{ mx: 1 }}/>,
    <AccessibilityNewIcon sx={{ mx: 1 }}/>,
    <GroupIcon sx={{ mx: 1 }}/>,
    <ComputerIcon sx={{ mx: 1 }}/>,
    <BathtubIcon sx={{ mx: 1 }}/>,
  ];

  const newList = [];

  for (let i = 0; i < categoriesList.length; i++) {
    newList.push(
      <>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Paper sx={{width: '300px', height: '300px'}} onClick={handleClose}>
            What? {categoriesList[i]}
          </Paper>
        </Menu>
        
        <IconButton onClick={handleMenu} color="inherit">
          {categoriesIcons[i]}
          {categoriesList[i]}
        </IconButton>
        
      </>
    );
    // this is very wrong
    // console.log(newList)
  }


  return (
    <AppBar position="static">
      <Toolbar sx={{ color: "#BDEFD8", backgroundColor: "#0E1428" }}>
        
        <Typography variant="h6" sx={{ mr: 4 }}>
          Categorias
        </Typography>

        {newList}

      </Toolbar>
    </AppBar>
  );
};

export default CategoriesBar;
