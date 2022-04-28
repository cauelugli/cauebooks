import React, { 
  // useContext,
  useState } from "react";

// import axios from "axios";

import {
  InputLabel,
  OutlinedInput,
  FormControl,
} from "@mui/material";

// import { Context } from "../../context/Context";
import AdminCategoriesMenu from "../../components/adminCategoriesMenu/AdminCategoriesMenu";
import AdminParagraph from "../../components/adminParagraph/AdminParagraph";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch({ type: "UPDATE_START" });
    // const updatedUser = {
    //   email,
    // };
    try {
      // const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      // dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      // dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="admin">
      <div className="adminWrapper">
        <form className="adminForm" onSubmit={handleSubmit}>
          <FormControl sx={{ m: 3, width:"50%" }} variant="outlined">
            <InputLabel>Titulo</InputLabel>
            <OutlinedInput
              type={"text"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Titulo"
            />
          </FormControl>
          <AdminCategoriesMenu />
          <AdminParagraph label="Intro"/>
          <AdminParagraph label="Tese"/>
          <AdminParagraph label="Antítese"/>
          <AdminParagraph label="Síntese"/>
          <AdminParagraph label="Finish Him"/>
          <button className="adminSubmit" type="submit">
            Dalhe
          </button>
          {success && (<span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>Boa poka!</span>)}
        </form>
      </div>
    </div>
  );
}
