import { useContext } from "react";
import { Link } from "react-router-dom";

import { IconButton, List, ListItem, Toolbar } from "@mui/material";

import CategoriesBar from "../categoriesBar/CategoriesBar";
import SearchBar from "../searchbar/SearchBar";
import SettingsMenu from "../settingsMenu/SettingsMenu";
import { Context } from "../../context/Context";

export default function Header({ data }) {
  const { user } = useContext(Context);

  return (
    <>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <div id="ghost-div" />

        <List
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ListItem>
            <Link
              style={{
                textDecoration: "none",
                color: "#0f0f0f",
                fontSize: "1.25em",
                fontFamily: "Varela Round, sans-serif",
              }}
              to="/"
            >
              HOME
            </Link>
          </ListItem>
          <ListItem>
            <Link
              style={{
                textDecoration: "none",
                color: "#0f0f0f",
                fontSize: "1.25em",
                fontFamily: "Varela Round, sans-serif",
              }}
              to="/about"
            >
              SOBRE
            </Link>
          </ListItem>
          <ListItem>
            <Link
              style={{
                textDecoration: "none",
                color: "#0f0f0f",
                fontSize: "1.25em",
                fontFamily: "Varela Round, sans-serif",
              }}
              to="/"
            >
              CONTATO
            </Link>
          </ListItem>
          {user.isAdmin && (
          <ListItem>
            <Link
              style={{
                textDecoration: "none",
                color: "#0f0f0f",
                fontSize: "1.25em",
                fontFamily: "Varela Round, sans-serif",
              }}
              to="/admin"
            >
              ADMIN
            </Link>
          </ListItem>
        )}
        </List>
        
        <IconButton>
          <SettingsMenu />
        </IconButton>
      </Toolbar>

      <SearchBar data={data} />
      <CategoriesBar />
    </>
  );
}
