import React from "react";
import { Link } from "react-router-dom";

import { Avatar, List, ListItem, Toolbar } from "@mui/material";

import SettingsMenu from "../settingsMenu/SettingsMenu";

const SmallScreenHeader = () => {
  return (
    <div>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Avatar
          alt="logo"
          src={window.location.origin + "/logo_notext.png"}
          sx={{ width: 56, height: 56, borderRadius: 3 }}
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
                fontFamily: "Varela Round, sans-serif",
              }}
              to="/contact"
            >
              CONTATO
            </Link>
          </ListItem>
        </List>

        <SettingsMenu />
      </Toolbar>
    </div>
  );
};

export default SmallScreenHeader;
