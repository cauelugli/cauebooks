import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';

import { Context } from "../../context/Context";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // eslint-disable-next-line
  const { user, dispatch } = useContext(Context);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        sx={{ "&:hover": { backgroundColor: "transparent" } }}
        onClick={handleClick}
      >
        <img
          className="topImg"
          src={window.location.origin + "/" + user.avatar + ".png"}
          alt=""
        />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>

        {/* <MenuItem onClick={handleClose}> */}
        <MenuItem onClick={() => alert('one day')}>
          <FavoriteBorderOutlinedIcon style={{ marginRight: "10%" }} />
          <p style={{ marginRight: "5px" }}>Favoritos</p>
        </MenuItem>

        <Link className="link" to="/settings">
          <MenuItem onClick={handleClose}>
            <AccountCircleOutlinedIcon style={{ marginRight: "10%" }} />
            <p style={{ marginRight: "5px" }}>Conta</p>
          </MenuItem>
        </Link>

        {/* <MenuItem onClick={handleClose}> */}
        <MenuItem onClick={() => alert('one day')}>
          <MeetingRoomOutlinedIcon style={{ marginRight: "10%" }} />
          <p style={{ marginRight: "5px" }}>Logout</p>
        </MenuItem>
      </Menu>
    </div>
  );
}
