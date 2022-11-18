import React, { useState } from "react";

import {
  AppBar,
  FormControl,
  IconButton,
  InputLabel,
  ListSubheader,
  Menu,
  MenuItem,
  // MenuItem,
  Paper,
  Select,
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
    "Brisas",
  ];

  const categoriesIcons = [
    <DangerousIcon sx={{ mx: 1 }} />,
    <SportsSoccerIcon sx={{ mx: 1 }} />,
    <FamilyRestroomIcon sx={{ mx: 1 }} />,
    <AccountBalanceIcon sx={{ mx: 1 }} />,
    <SpaIcon sx={{ mx: 1 }} />,
    <NaturePeopleIcon sx={{ mx: 1 }} />,
    <AccessibilityNewIcon sx={{ mx: 1 }} />,
    <GroupIcon sx={{ mx: 1 }} />,
    <ComputerIcon sx={{ mx: 1 }} />,
    <BathtubIcon sx={{ mx: 1 }} />,
  ];

  const newList = [];

  for (let i = 0; i < categoriesList.length; i++) {
    newList.push(
      <>
        <FormControl
          variant="filled"
          sx={{
            width: 157,
            color: "#BDEFD8",
            backgroundColor: "#0E1428",
          }}
        >
          <InputLabel
            sx={{ color: "#BDEFD8", backgroundColor: "#0E1428" }}
            htmlFor="grouped-select"
          >
            {categoriesIcons[i]} 
            {categoriesList[i]}
          </InputLabel>
          <Select
            sx={{ color: "#BDEFD8", backgroundColor: "#0E1428" }}
            id="grouped-select"
            label="Grouping"
          >
            <ListSubheader sx={{ m: 1 }}>Most Recent</ListSubheader>
            <MenuItem value={0} sx={{ m: 1 }}>
              {categoriesList[i]}
            </MenuItem>
            <ListSubheader sx={{ m: 1 }}>Most Liked</ListSubheader>
            <MenuItem value={0} sx={{ m: 1 }}>
              {categoriesIcons[i]}
            </MenuItem>
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

        {newList}
      </Toolbar>
    </AppBar>
  );
};

export default CategoriesBar;
