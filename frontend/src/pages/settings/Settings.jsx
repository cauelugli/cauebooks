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
  Box,
  TextField,
} from "@mui/material";

import { Context } from "../../context/Context";
import CheckButton from "../../components/checkButton/CheckButton";

const api = axios.create({
  baseURL: (process.env.DEV_API_URL || "https://api.cauebooks.com.br/api"),
});

export default function Settings() {
  const { user, dispatch } = useContext(Context);

  const [avatar, setAvatar] = useState(user.avatar);
  const [username, setUsername] = useState(user.username);

  const [existingUser, setExistingUser] = useState(false);
  const [openExistingUserModal, setExistingUserModal] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  const handleExistingUserModal = () => {
    setExistingUserModal(true);
  };

  const handleCloseExistingUserModal = () => {
    setExistingUserModal(false);
  };

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
      const res = await api.delete("/users/" + user._id);
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
    };
    try {
      const res = await api.put("/users/" + user._id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      handleUpdateModal();
    } catch (err) {
      if (err.message === "Request failed with status code 403") {
        setExistingUser(true);
        handleExistingUserModal(true);
        console.log(err.message);
      }
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          component="form"
          onSubmit={handleUpdate}
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#0E1428",
            border: "3px solid",
            backgroundColor: "#f1f1f0e3",
            borderColor: "grey.400",
            borderRadius: 3,
          }}
        >
          <Typography
            sx={{ p: 5, color: "grey.800" }}
            component="h3"
            variant="h5"
          >
            Atualize seu Perfil
          </Typography>
          <Box sx={{ mt: 1 }}>
            <InputLabel sx={{ color: "grey.800" }}>Avatar</InputLabel>
            <FormControl
              sx={{
                my: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
            <InputLabel sx={{ mt: 2, color: "grey.800" }}>Email</InputLabel>
            <Typography sx={{py: 2, color: "grey.500"}}>{user.email}</Typography>
            <InputLabel sx={{ color: "grey.800" }}>Username</InputLabel>
            <TextField
              sx={{ color: "grey.800" }}
              margin="normal"
              fullWidth
              id="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <CheckButton />

          {existingUser && (
            <Dialog
              open={openExistingUserModal}
              onClose={handleCloseExistingUserModal}
            >
              <DialogTitle>
                <Typography align="center" variant="h6">
                  Dahora, mas <strong>"{username}"</strong> já está em uso por
                  um outro alguém.
                </Typography>
              </DialogTitle>
              <DialogActions>
                <Button
                  sx={{
                    color: "#000",
                    backgroundColor: "#fff",
                    borderColor: "#000",
                    "&:hover": {
                      color: "#fff",
                      backgroundColor: "#000",
                      borderColor: "#fff",
                    },
                  }}
                  variant="outlined"
                  onClick={handleCloseExistingUserModal}
                >
                  Tá bom, né... ¯\_(ツ)_/¯
                </Button>
              </DialogActions>
            </Dialog>
          )}
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
        <DialogTitle>Tem certeza, pessoa?</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            Algumas coisas na vida não têm volta, e deletar sua conta é uma
            delas. Mas, sé isso mesmo que você quer...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="inherit" onClick={handleCloseDeleteModal}>
            É, pensando melhor...
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            autoFocus
          >
            SIM! "SUDO DELETE -FORCE"
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
