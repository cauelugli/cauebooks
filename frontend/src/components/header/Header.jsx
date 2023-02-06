import { Link } from "react-router-dom";

import { Avatar, IconButton, List, ListItem, Toolbar } from "@mui/material";

import CategoriesBar from "../categoriesBar/CategoriesBar";
import SearchBar from "../searchbar/SearchBar";
import SettingsMenu from "../settingsMenu/SettingsMenu";

export default function Header({ data }) {
  return (
    <>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Avatar
        
          alt="logo"
          src={window.location.origin + "/logo_notext.png"}
          sx={{ width: 56, height: 56, borderRadius:3 }}
        />

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
