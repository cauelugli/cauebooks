import React, { useState } from "react";
import { Link } from "react-router-dom";

import { IconButton, Menu, MenuItem, Divider, Typography } from "@mui/material";

export default function HomeSmallScreenHeaderButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton sx={{ml:4,}} onClick={handleClick}>
        <Typography
        variant="h6"
          sx={{
            p:1,
            
            color: "grey.800",
            border: "1px solid",
            borderColor: "grey.800",
            borderRadius: "10px 0 10px 0",
          }}
        >cauebooks</Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Link className="link" to="/about">
          <MenuItem onClick={handleClose} sx={{ color: "#0E1428" }}>
            <Typography sx={{ width: "220px", textAlign: "center" }}>
              SOBRE
            </Typography>
          </MenuItem>
        </Link>

        <Divider sx={{ my: 1 }} />

        <Link className="link" to="/dialogue">
          <MenuItem onClick={handleClose} sx={{ color: "#0E1428" }}>
            <Typography sx={{ width: "220px", textAlign: "center" }}>
              DIÁLOGO
            </Typography>
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
