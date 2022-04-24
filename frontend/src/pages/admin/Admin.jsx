import React from "react";
import { useContext, useState } from "react";
import axios from "axios";

import {
  InputLabel,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import "./admin.css";

// import { Context } from "../../context/Context";
import CategoriesMenu from "../../components/categoriesMenu/CategoriesMenu";

export default function Admin() {
  const [email, setEmail] = useState("");
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
          <FormControl sx={{ m: 3 }} variant="outlined">
            <InputLabel>Titulo</InputLabel>
            <OutlinedInput
              type={"text"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Titulo"
            />
          </FormControl>
          <CategoriesMenu />
          <FormControl sx={{ m: 3 }} variant="outlined">
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              type={"text"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
            />
          </FormControl>
          <button className="adminSubmit" type="submit">
            Dalhe
          </button>
          {success && (<span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>Boa poka!</span>)}
        </form>
      </div>
    </div>
  );
}
