import React from "react";

import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const CheckButton = () => {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        my: 4,
        width: "50%",
        backgroundColor: "#0E1428",
        color: "#92AF9E",
        "&:hover": {
          bgcolor: "#92AF9E",
          color: "#0E1428",
        },
      }}
    >
      <CheckIcon />
    </Button>
  );
};

export default CheckButton;
