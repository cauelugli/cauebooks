import React, { useState } from "react";

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
  CssBaseline,
  TextField,
  Button,
  Modal,
  Divider,
} from "@mui/material";

import { Box } from "@mui/system";

import Login from "../login/Login";

export default function Register() {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [done, setDone] = useState(false);

  const [error, setError] = useState(false);

  function handleAvatarChange(e) {
    setAvatar(e.target.value);
  }

  const handleShowModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      await axios.post("/auth/register", {
        avatar,
        username,
        email,
        password,
      });
      setLoading(false);
      handleShowModal();
      setDone(true);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
    {!done && 
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: "30%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ m: 3 }} component="h3" variant="h4">
          Crie sua Conta
        </Typography>
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="Nome de Usuário"
            label="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="Email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onMouseDown={handleMouseDownPassword}
          />
          <Button
            type="submit"
            fullWidth
            disableElevation
            disableRipple
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
            {loading ? <CircularProgress variant="outlined" /> : "Registre-se!"}
          </Button>
        </Box>
      </Box>
      <Grid container sx={{ mt: 2 }}>
        <Grid item>
          <Link
            fullWidth
            href="/login"
            underline="none"
            sx={{ m: 1, color: "#e4e4e4" }}
          >
            Já tem conta, é?
          </Link>
        </Grid>
      </Grid>
      {error && (
        <span style={{ color: "red", textAlign: "center", marginTop: "5%" }}>
          Algo de errado não está certo!
        </span>
      )}
    </Container>
    }
    {done && 
    <Login />
    }
    <Modal
      open={modal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
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
      </Box>
    </Modal>
    </>
  );
}
