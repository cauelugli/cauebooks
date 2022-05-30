import React, { useState, useContext } from "react";

import axios from "axios";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Divider,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";

import { Context } from "../../context/Context";

import Settings from "../settings/Settings";

export default function PasswordReset() {
  const { user } = useContext(Context);
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [modal, setModal] = useState(false);
  const [done, setDone] = useState(false);

  const handleShowModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const handleSubmit = () => {
    if (newPassword !== newPassword2) {
      return alert("Parça, as senhas não são as mesmas! Põe de novo.");
    } else {
      try {
        axios.put(`/users/${user._id}`, { password: newPassword });
        handleShowModal();
        setDone(true);
      } catch (err) {
        console.log(err);
      }
    }
  };
  

  return (
    <>
      {!done && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ p: 5 }} component="h3" variant="h4">
            Redefina sua senha
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <InputLabel>Nova Senha</InputLabel>
            <TextField
              margin="normal"
              fullWidth
              type="password"
              id="NewPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <InputLabel sx={{ mt: 2 }}>Repeat please</InputLabel>
            <TextField
              margin="normal"
              fullWidth
              type="password"
              id="NewPassword2"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
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
                },
              }}
            >
              Redefinir
            </Button>
          </Box>
        </Box>
      )}

      {done && <Settings />}

      <Dialog open={modal} onClose={handleCloseModal}>
        <DialogTitle>Boa, mano! Sua senha foi alterada!</DialogTitle>
        <Divider />
        <DialogActions>
          <Button
            color="success"
            size="small"
            variant="contained"
            onClick={handleCloseModal}
            autoFocus
          >
            Lindo
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
