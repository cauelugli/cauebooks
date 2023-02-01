import { useContext, useState } from "react";

import axios from "axios";

import {
  Box,
  Button,
  Container,
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
import CheckButton from "../../components/checkButton/CheckButton";

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
        setUsername("");
        setPassword("");
        handleNoUserModal(true);
        console.log(err.message);
      }
      if (err.message === "Request failed with status code 401") {
        setNoPass(true);
        setPassword("");
        handleNoPassModal(true);
        console.log(err.message);
      }
      if (err.message === "Request failed with status code 409") {
        setNoActive(true);
        setUsername("");
        setPassword("");
        handleNoActiveModal(true);
        console.log(err.message);
      }
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          color: "grey.700",
          border: "3px solid",
          backgroundColor: "#fff",
          borderColor: "grey.400",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "17%",
        }}
      >
        <Box sx={{ paddingTop: "4%" }}>
          <img src={window.location.origin + "/logo.png"} alt="" />
        </Box>
        <Typography sx={{ mt: 6 }} component="h3" variant="h6">
          Entre em sua Conta
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CheckButton />
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
            <Typography align="center" variant="h5">
              Beleza, {username}, mas essa não é sua senha...
            </Typography>
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
              Falta ativar tua conta no e-mail!
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography align="center">
                Aproveita e já ativa agora. Qual e-mail tu usa?
              </Typography>
            </DialogContentText>
          </DialogContent>

          <Divider />
          <DialogActions sx={{ m: 4 }}>
            <Button
              sx={{
                mx: 2.5,
                color: "#fff",
                backgroundColor: "#DB4437",
                borderColor: "#fff",
                "&:hover": {
                  color: "#DB4437",
                  backgroundColor: "#fff",
                  borderColor: "#DB4437",
                },
              }}
              variant="outlined"
              href="https://gmail.com"
            >
              Gmail
            </Button>

            <Button
              sx={{
                mx: 2.5,
                color: "#fff",
                backgroundColor: "#29bbff",
                borderColor: "#fff",
                "&:hover": {
                  color: "#29bbff",
                  backgroundColor: "#fff",
                  borderColor: "#29bbff",
                },
              }}
              variant="outlined"
              href="https://outlook.com"
            >
              Outlook
            </Button>

            <Button
              sx={{
                mx: 2.5,
                color: "#fff",
                backgroundColor: "#430297",
                borderColor: "#fff",
                "&:hover": {
                  color: "#430297",
                  backgroundColor: "#fff",
                  borderColor: "#430297",
                },
              }}
              variant="outlined"
              href="https://mail.yahoo.com"
            >
              Yahoo
            </Button>

            <Button
              sx={{
                ml: 4,
                color: "#fff",
                backgroundColor: "#000",
                borderColor: "#fff",
                "&:hover": {
                  color: "#000",
                  backgroundColor: "#fff",
                  borderColor: "#000",
                },
              }}
              variant="outlined"
              onClick={handleCloseNoActiveModal}
            >
              Depois
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
