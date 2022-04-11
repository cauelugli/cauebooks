import "./settings.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";

export default function Settings() {
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  function handleAvatarChange(e) {setAvatar(e.target.value);}

  // const { user, dispatch } = useContext(Context);
  const { user, dispatch } = useContext(Context);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      avatar,
      email,
      password,
    };
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Avatar</label>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select value={avatar} onChange={handleAvatarChange} >
              <MenuItem value={'1'}><img src={window.location.origin + '/1.png'} alt="avatar1" /></MenuItem>
              <MenuItem value={'2'}><img src={window.location.origin + '/2.png'} alt="avatar2" /></MenuItem>
              <MenuItem value={'3'}><img src={window.location.origin + '/3.png'} alt="avatar3" /></MenuItem>
              <MenuItem value={'4'}><img src={window.location.origin + '/4.png'} alt="avatar4" /></MenuItem>
              <MenuItem value={'5'}><img src={window.location.origin + '/5.png'} alt="avatar5" /></MenuItem>
              <MenuItem value={'6'}><img src={window.location.origin + '/6.png'} alt="avatar6" /></MenuItem>
              <MenuItem value={'7'}><img src={window.location.origin + '/7.png'} alt="avatar7" /></MenuItem>
              <MenuItem value={'8'}><img src={window.location.origin + '/8.png'} alt="avatar8" /></MenuItem>
              <MenuItem value={'9'}><img src={window.location.origin + '/9.png'} alt="avatar9" /></MenuItem>
            </Select>
          </FormControl>
          <label>Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <label>New Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}> Profile has been updated!</span>
          )}
        </form>
        <span className="settingsDeleteTitle">Delete Account</span>
      </div>
    </div>
  );
}
