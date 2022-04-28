import React, { useState } from "react";

import { FormControl, TextField } from "@mui/material";

const AdminParagraph = ({ label }) => {
  const [paragraph, setParagraph] = useState("");

  return (
    <FormControl sx={{ margin: 3, width: "70%" }}>
      <TextField
        label={label}
        multiline
        maxRows={4}
        value={paragraph}
        onChange={(e) => setParagraph(e.target.value)}
        variant="outlined"
      />
    </FormControl>
  );
};

export default AdminParagraph;
