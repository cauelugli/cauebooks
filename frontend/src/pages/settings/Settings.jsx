import React, { useContext, useState } from "react";

import axios from "axios";

import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Button,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogActions,
  Divider,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

import { Context } from "../../context/Context";

export default function Settings() {
  const { user, dispatch } = useContext(Context);

  const [avatar, setAvatar] = useState(user.avatar);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleDeleteConfirmation = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete("/users/" + user._id);
      setSuccess(true);
      console.log('res.data', res.data)
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      console.log(err)
    }
  };

  const handleUpdate = async (e) => {
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
          <Typography
            variant="h6"
            sx={{ fontSize: "30px", marginLeft: "15%", color: "#0E1428" }}
          >
            Atualize seu Perfil
          </Typography>
        </div>
        <form className="settingsForm" onSubmit={handleUpdate}>
          <label>Avatar</label>
          <FormControl sx={{ m: 3 }}>
            <Select value={avatar} onChange={handleAvatarChange}>
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
        </form>
        <Button
          variant="default"
          onClick={handleDeleteConfirmation}
          sx={{ marginLeft: "65%" }}
        >
          Deletar Conta
        </Button>
        <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
          <DialogTitle>Tem certeza, mano?</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText>
              Algumas coisas na vida não tem volta, e deletar sua conta é uma
              delas. É isso mesmo que você quer?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="inherit" onClick={handleCloseDeleteModal}>
              Puts, nem
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleDelete}
              autoFocus
            >
              Sim
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
