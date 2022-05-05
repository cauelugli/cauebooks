import React, { useState } from "react";

import { FormControl, TextField } from "@mui/material";

const AdminParagraph = () => {
  const [paragraph, setParagraph] = useState("");
  return (
    <FormControl sx={{ margin: 3, width: "70%", backgroundColor: "#e4e4e4" }}>
      <TextField
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
