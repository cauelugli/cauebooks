import React, { useContext, useState } from "react";

import axios from "axios";

import {
  InputLabel,
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
  Grid,
  Container,
  CssBaseline,
  Box,
  TextField,
} from "@mui/material";

import { Context } from "../../context/Context";

export default function Settings() {
  const { user, dispatch } = useContext(Context);

  const [avatar, setAvatar] = useState(user.avatar);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  const handleDeleteConfirmation = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete("/users/" + user._id);
      dispatch({ type: "LOGOUT", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      avatar,
      username,
      email,
    };
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      handleUpdateModal();
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ p: 5 }} component="h3" variant="h4">
            Atualize seu Perfil
          </Typography>
          <Box component="form" onSubmit={handleUpdate} sx={{ mt: 1 }}>
            <InputLabel>Avatar</InputLabel>
            <FormControl sx={{
            my: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
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
            <InputLabel>Username</InputLabel>
            <TextField
              margin="normal"
              fullWidth
              id="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputLabel sx={{mt:2}}>Email</InputLabel>
            <TextField
              margin="normal"
              fullWidth
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#0E1428",
                color: "#e4e4e4",
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "#0E1428",
                }
              }}
            >
              Atualizar
            </Button>
          </Box>
        </Box>

        <Grid container sx={{ mt: 2 }}>
          <Grid item>
            <Button variant="default" onClick={handleDeleteConfirmation}>
              Deletar Conta
            </Button>
          </Grid>
        </Grid>
      </Container>

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

      <Dialog open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <DialogTitle>Seu perfil foi atualizado com sucesso!</DialogTitle>
        <Divider />
        <DialogActions>
          <Button
            color="success"
            size="small"
            variant="contained"
            onClick={handleCloseUpdateModal}
            autoFocus
          >
            Nice
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
