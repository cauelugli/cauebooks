import React, { useState } from "react";
import emailjs from "@emailjs/browser";

import axios from "axios";

import {
  InputLabel,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Divider,
  Container,
  Box,
  TextField,
  Grid,
  Link,
} from "@mui/material";

import CheckButton from "../../components/checkButton/CheckButton";
import Login from "../login/Login";

const api = axios.create({
  baseURL: (process.env.REACT_APP_DEV_API_URL || "https://api.cauebooks.com.br/api"),
});

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [done, setDone] = useState(false);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [open404Modal, setOpen404Modal] = useState(false);

  const handleUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handle404Modal = () => {
    setOpen404Modal(true);
  };

  const handleClose404Modal = () => {
    setOpen404Modal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/forgotPassword", {
        email: email,
      });
      emailjs.send(
        "contato",
        "forgotPassword",
        {
          to_name: res.data.username,
          to_email: res.data.email,
          newPassword: res.data.newPass,
        },
        "fVnxtfZFIiPcu8UvO"
      );
      handleUpdateModal();
      setDone(true);
    } catch (err) {
      if (err.message === "Request failed with status code 404") {
        handle404Modal();
      }
      console.log("err", err);
    }
  };

  return (
    <>
      {!done ? (
        <Container component="main" maxWidth="xs">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              my: "15%",
              display: "flex",
              flexDirection: "column",
              color: "#0E1428",
              border: "3px solid",
              backgroundColor: "#fff",
              borderColor: "grey.400",
              borderRadius: 3,
            }}
          >
            <Grid sx={{ paddingTop: "4%" }} container justifyContent="center">
              <img src={window.location.origin + "/logo.png"} alt="" />
            </Grid>
            <Divider sx={{ my: 1, mx: 5 }} />
            <Typography
              sx={{ py: 2, color: "grey.800", alignSelf: "center" }}
              variant="h5"
            >
              Redefina sua Senha
            </Typography>
            <Box sx={{ mt: 1, alignSelf: "center" }}>
              <InputLabel sx={{ mt: 2, color: "grey.800" }}>
                E-mail da Conta
              </InputLabel>
              <TextField
                required
                margin="normal"
                fullWidth
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Grid container justifyContent="center">
              <CheckButton />
            </Grid>
          </Box>
          <Grid container sx={{ mt: 2 }}>
            <Grid item xs>
              <Link
                fullWidth
                href="/login"
                underline="none"
                sx={{ m: 1, color: "#e4e4e4" }}
              >
                Lembrou, é?
              </Link>
            </Grid>
          </Grid>
        </Container>
      ) : (<Login />)}

      <Dialog open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <DialogTitle>
          Foi que foi! Dá uma olhada na tua caixa de email.
        </DialogTitle>
        <Divider />
        <DialogActions>
          <Button
            color="success"
            size="small"
            variant="contained"
            onClick={handleCloseUpdateModal}
            autoFocus
          >
            Aí sim!
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open404Modal} onClose={handleClose404Modal}>
        <DialogTitle>KKKK nem existe esse email aí</DialogTitle>
        <Divider />
        <DialogActions>
          <Button
            color="success"
            size="small"
            variant="contained"
            onClick={handleClose404Modal}
            autoFocus
          >
            To viajando...
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
