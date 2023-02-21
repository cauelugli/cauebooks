import React from "react";
import { Link } from "react-router-dom";

import { Avatar, List, ListItem, Toolbar } from "@mui/material";

import SettingsMenu from "../settingsMenu/SettingsMenu";
import HomeSmallScreenHeaderButton from "../homeSmallScreenHeaderButton/HomeSmallScreenHeaderButton";

const SmallScreenHeader = () => {
  return (
    <div>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">
          <Avatar
            alt="logo"
            src={window.location.origin + "/logo_notext.png"}
            sx={{ width: 56, height: 56, borderRadius: 3 }}
          />
        </Link>

        <HomeSmallScreenHeaderButton />

        <SettingsMenu />
      </Toolbar>
    </div>
  );
};

export default SmallScreenHeader;
