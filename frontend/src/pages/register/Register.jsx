import React, { useState } from "react";
import emailjs from "@emailjs/browser";

import axios from "axios";

import {
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
  Grid,
  Link,
  Typography,
  Container,
  TextField,
  Modal,
  Divider,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";

import { Box } from "@mui/material";

import Login from "../login/Login";
import CheckButton from "../../components/checkButton/CheckButton";

const api = axios.create({
  baseURL: (process.env.DEV_API_URL || "https://api.cauebooks.com.br/api"),
});

export default function Register() {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [done, setDone] = useState(false);

  const [existingUser, setExistingUser] = useState(false);
  const [existingEmail, setExistingEmail] = useState(false);

  const [openExistingUserModal, setExistingUserModal] = useState(false);
  const [openExistingEmailModal, setExistingEmailModal] = useState(false);

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  const handleExistingUserModal = () => {
    setExistingUserModal(true);
  };

  const handleCloseExistingUserModal = () => {
    setExistingUserModal(false);
  };

  const handleExistingEmailModal = () => {
    setExistingEmailModal(true);
  };

  const handleCloseExistingEmailModal = () => {
    setExistingEmailModal(false);
  };

  const handleShowModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/register", {
        avatar,
        username,
        email,
        password,
      });
      emailjs.send(
        "contato",
        "activation",
        {
          to_name: username,
          to_email: email,
          link: `https://cauebooks.com.br/users/activate/${res.data._id}`,
        },
        "fVnxtfZFIiPcu8UvO"
      );
      setLoading(false);
      handleShowModal();
      setDone(true);
    } catch (err) {
      if (err.message === "Request failed with status code 403") {
        setExistingUser(true);
        handleExistingUserModal(true);
        console.log(err.message);
      }
      if (err.message === "Request failed with status code 409") {
        setExistingEmail(true);
        handleExistingEmailModal(true);
        console.log(err.message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      {!done && (
        <Container
          component="main"
          maxWidth="md"
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              marginTop: "4%",
              display: "flex",
              flexDirection: "column",
              border: "3px solid",
              borderColor: "grey.400",
              backgroundColor: "#fff",
              borderRadius: 3,
            }}
          >
            <Grid container justifyContent="center">
              <Box sx={{ paddingTop: "2%" }}>
                <img src={window.location.origin + "/logo.png"} alt="" />
              </Box>
            </Grid>
            <Divider sx={{ mb: 2, mx: 9 }} />
            <Grid container justifyContent="center">
              <Typography sx={{ color: "grey.700", my: 2 }} variant="h5">
                Crie sua Conta
              </Typography>
            </Grid>

            <Grid container justifyContent="center">
              <Box
                sx={{
                  display: "inline-flex",
                }}
              >
                <Box
                  sx={{
                    m: 2,
                    mr: 9,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ color: "grey.600" }} variant="h6">
                    Preencha os Dados &#128203;
                  </Typography>
                  <TextField
                    margin="normal"
                    required
                    id="Nome de Usuário"
                    label="Nome de Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    id="Email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    margin="normal"
                    required
                    label="Senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>
                <Divider
                  sx={{ height: "auto", my: 4, mr: 3 }}
                  orientation="vertical"
                />

                <Box
                  sx={{
                    m: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ color: "grey.600", mb: 6 }} variant="h6">
                    Escolha um Avatar &#128008;
                  </Typography>
                  <FormControl>
                    <Select value={avatar} onChange={handleAvatarChange}>
                      <MenuItem value={"1"}>
                        <img
                          src={window.location.origin + "/1.png"}
                          alt="avatar1"
                        />
                      </MenuItem>
                      <MenuItem value={"2"}>
                        <img
                          src={window.location.origin + "/2.png"}
                          alt="avatar2"
                        />
                      </MenuItem>
                      <MenuItem value={"3"}>
                        <img
                          src={window.location.origin + "/3.png"}
                          alt="avatar3"
                        />
                      </MenuItem>
                      <MenuItem value={"4"}>
                        <img
                          src={window.location.origin + "/4.png"}
                          alt="avatar4"
                        />
                      </MenuItem>
                      <MenuItem value={"5"}>
                        <img
                          src={window.location.origin + "/5.png"}
                          alt="avatar5"
                        />
                      </MenuItem>
                      <MenuItem value={"6"}>
                        <img
                          src={window.location.origin + "/6.png"}
                          alt="avatar6"
                        />
                      </MenuItem>
                      <MenuItem value={"7"}>
                        <img
                          src={window.location.origin + "/7.png"}
                          alt="avatar7"
                        />
                      </MenuItem>
                      <MenuItem value={"8"}>
                        <img
                          src={window.location.origin + "/8.png"}
                          alt="avatar8"
                        />
                      </MenuItem>
                      <MenuItem value={"9"}>
                        <img
                          src={window.location.origin + "/9.png"}
                          alt="avatar9"
                        />
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              {loading ? (
                <CircularProgress variant="outlined" />
              ) : (
                <CheckButton type="submit" />
              )}
            </Grid>
          </Box>

          <Grid container sx={{ mt: 2 }}>
            <Grid item>
              <Link
                href="/login"
                underline="none"
                sx={{ m: 1, color: "#e4e4e4" }}
              >
                Ah, tu já tem conta?
              </Link>
            </Grid>
          </Grid>

          {existingUser && (
            <Dialog
              open={openExistingUserModal}
              onClose={handleCloseExistingUserModal}
            >
              <DialogTitle>
                <Typography align="center" variant="h5">
                  Então, esse usuário "{username}" já existe oh, mó fita...
                </Typography>
              </DialogTitle>
              <DialogActions>
                <Button
                  style={{
                    color: "#133337",
                    borderColor: "#133337",
                  }}
                  variant="outlined"
                  onClick={handleCloseExistingUserModal}
                >
                  Tá, vou pensar em outro nome
                </Button>
              </DialogActions>
            </Dialog>
          )}

          {existingEmail && (
            <Dialog
              open={openExistingEmailModal}
              onClose={handleCloseExistingEmailModal}
            >
              <DialogTitle>
                <Typography variant="h5" align="center">
                  Então... o e-mail "{email}" já tá em uso, não é teu?
                </Typography>
              </DialogTitle>

              <Divider />
              <DialogActions>
                <Button
                  sx={{
                    backgroundColor: "#e4e4e4",
                    color: "#0E1428",
                    borderColor: "#0E1428",
                    "&:hover": {
                      backgroundColor: "#0E1428",
                      color: "#e4e4e4",
                      borderColor: "#e4e4e4",
                    },
                  }}
                  variant="outlined"
                  onClick={handleCloseExistingEmailModal}
                >
                  ¯\_(ツ)_/¯
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Container>
      )}
      {done && <Login />}
      <Modal
        open={modal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "#e4e4e4",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h5">
            Sua conta foi criada com sucesso!
          </Typography>
          <Divider />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Verifique sua caixa de email para ativar sua conta.
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CheckButton />
          </div>
        </Box>
      </Modal>
    </>
  );
}
