import { useContext, useState } from "react";

import axios from "axios";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { Context } from "../../context/Context";

export default function Login() {
  const { dispatch } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [no_user, setNoUser] = useState(false);
  const [no_pass, setNoPass] = useState(false);
  const [no_active, setNoActive] = useState(false);
  const [openNoUserModal, setNoUserModal] = useState(false);
  const [openNoPassModal, setNoPassModal] = useState(false);
  const [openNoActiveModal, setNoActiveModal] = useState(false);

  const handleNoUserModal = () => {
    setNoUserModal(true);
  };

  const handleCloseNoUserModal = () => {
    setNoUserModal(false);
  };

  const handleNoPassModal = () => {
    setNoPassModal(true);
  };

  const handleCloseNoPassModal = () => {
    setNoPassModal(false);
  };

  const handleNoActiveModal = () => {
    setNoActiveModal(true);
  };

  const handleCloseNoActiveModal = () => {
    setNoActiveModal(false);
  };

  const handleRegister = async () => {
    window.location.replace("/register");
  };

  const handleResetPass = async () => {
    window.location.replace("/register");
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
      if (err.message === "Request failed with status code 400") {
        setNoUser(true);
        handleNoUserModal(true);
        console.log(err.message);
        console.log("Errou o user");
      }
      if (err.message === "Request failed with status code 401") {
        setNoPass(true);
        handleNoPassModal(true);
        console.log(err.message);
        console.log("Errou o pass");
      }
      if (err.message === "Request failed with status code 409") {
        setNoActive(true);
        handleNoActiveModal(true);
        console.log(err.message);
        console.log("Errou o active");
      }
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ m: 3 }} component="h3" variant="h4">
          Entre em sua Conta
        </Typography>
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
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onMouseDown={handleMouseDownPassword}
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
            Login
          </Button>
        </Box>
      </Box>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs>
          <Link
            fullWidth
            href="#"
            underline="none"
            sx={{ m: 1, color: "#e4e4e4" }}
          >
            Esqueceu, foi?
          </Link>
        </Grid>
        <Grid item>
          <Link
            fullWidth
            href="/register"
            underline="none"
            sx={{ m: 1, ml: 3, color: "#0E1428" }}
          >
            Faz a Conta aí!
          </Link>
        </Grid>
      </Grid>

      {no_user && (
        <Dialog open={openNoUserModal} onClose={handleCloseNoUserModal}>
          <DialogTitle>
            <Typography align="center" variant="h5">
              KKKK nem existe esse usuário...
            </Typography>
          </DialogTitle>
          <DialogActions>
            <Button
              style={{
                color: "#133337",
                borderColor: "#133337",
              }}
              variant="outlined"
              onClick={handleCloseNoUserModal}
            >
              Pode crer kkk
            </Button>
            <Button
              color="success"
              variant="contained"
              onClick={handleRegister}
            >
              Bora criar um então!
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {no_pass && (
        <Dialog open={openNoPassModal} onClose={handleCloseNoPassModal}>
          <DialogTitle>
            <Typography align="center" variant="h5">Não é essa senha não...</Typography>
          </DialogTitle>
          <DialogActions>
            <Button
              style={{
                color: "#133337",
                borderColor: "#133337",
              }}
              variant="outlined"
              onClick={handleCloseNoPassModal}
            >
              Nossa! Que vacilo...
            </Button>
            <Button color="error" variant="contained" onClick={handleResetPass}>
              Puts, não lembro a senha...
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {no_active && (
        <Dialog open={openNoActiveModal} onClose={handleCloseNoActiveModal}>
          <DialogTitle>
            <Typography variant="h5" align="center">
              Falta ativar a conta no e-mail!
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography align="center">
                Quer já aproveitar e fazer agora? Qual e-mail tu usa?
              </Typography>
            </DialogContentText>
          </DialogContent>

          <Divider />
          <DialogActions sx={{ m: 4 }}>
            <Button
              sx={{
                mx: 2.5,
                color: "#DB4437",
                borderColor: "#DB4437",
              }}
              variant="outlined"
              href="https://gmail.com"
            >
              Gmail
            </Button>

            <Button
              sx={{
                mx: 2.5,
                color: "#29bbff",
                borderColor: "#29bbff",
              }}
              variant="outlined"
              href="https://outlook.com"
            >
              Outlook
            </Button>

            <Button
              sx={{
                mx: 2.5,
                color: "#430297",
                borderColor: "#430297",
              }}
              variant="outlined"
              href="https://mail.yahoo.com"
            >
              Yahoo
            </Button>

            <Button
              sx={{ ml: 4 }}
              variant="inherit"
              onClick={handleCloseNoActiveModal}
            >
              Puts, nem
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
