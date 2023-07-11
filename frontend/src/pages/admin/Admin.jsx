import React from "react";

import { Button, Menu } from "@mui/material";

import NewCategory from "../../components/newCategory/NewCategory";
import NewText from "../../components/newText/NewText";

export default function Admin() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "#0E1428", backgroundColor: "#BDEFD8", m: 2 }}
      >
        Nova Categoria
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <NewCategory />
      </Menu>

      <Button
        href="/admin/dialogue"
        sx={{ color: "#BDEFD8", backgroundColor: "#0E1428", m: 2 }}
      >
        Diálogo
      </Button>

      <NewText />
    </div>
  );
}
