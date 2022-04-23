import React from "react";
import { useContext, useState } from "react";
import axios from "axios";

import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import "./settings.css";

import { Context } from "../../context/Context";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          <span className="settingsUpdateTitle">Atualize seu Perfil</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Avatar</label>
          <FormControl autoWidth sx={{ m: 3 }}>
            <Select  value={avatar} onChange={handleAvatarChange}>
              <MenuItem value={"1"}>
                <img src={window.location.origin + "/1.png"} alt="avatar1" />
              </MenuItem>
              <MenuItem value={"2"}>
                <img src={window.location.origin + "/2.png"} alt="avatar2" />
              </MenuItem>
              <MenuItem value={"3"}>
                <img src={window.location.origin + "/3.png"} alt="avatar3" />
              </MenuItem>
              <MenuItem value={"4"}>
                <img src={window.location.origin + "/4.png"} alt="avatar4" />
              </MenuItem>
              <MenuItem value={"5"}>
                <img src={window.location.origin + "/5.png"} alt="avatar5" />
              </MenuItem>
              <MenuItem value={"6"}>
                <img src={window.location.origin + "/6.png"} alt="avatar6" />
              </MenuItem>
              <MenuItem value={"7"}>
                <img src={window.location.origin + "/7.png"} alt="avatar7" />
              </MenuItem>
              <MenuItem value={"8"}>
                <img src={window.location.origin + "/8.png"} alt="avatar8" />
              </MenuItem>
              <MenuItem value={"9"}>
                <img src={window.location.origin + "/9.png"} alt="avatar9" />
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 3 }} variant="outlined">
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              type={"text"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              endAdornment={
                <InputAdornment position="end" edge="end">
                  <AlternateEmailIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl sx={{ m: 3 }} variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              value={password}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <button className="settingsSubmit" type="submit">
            Atualizar
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Seu perfil foi atualizado com sucesso!
            </span>
          )}
        </form>
        <span className="settingsDeleteTitle">Deletar Conta</span>
      </div>
    </div>
  );
}
