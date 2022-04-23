import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { IconButton, Menu, MenuItem } from "@mui/material";

import { Context } from "../../context/Context";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
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
      <IconButton sx={{ "&:hover": { backgroundColor: "transparent" }} } onClick={handleClick}>
        <img
          className="topImg"
          src={window.location.origin + "/" + user.avatar + ".png"}
          alt=""
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/settings">Settings</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
