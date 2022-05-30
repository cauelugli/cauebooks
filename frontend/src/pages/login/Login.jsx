import { useContext, useState } from "react";

import axios from "axios";

import {
  Box,
  Button,
  Container,
  CssBaseline,
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

  const [error, setError] = useState(false);

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
      setError(true);
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
            sx={{ mt: 3, mb: 2, backgroundColor: "#0E1428", color: "#e4e4e4",
            "&.MuiButtonBase-root:hover": {
              bgcolor: "#0E1428",
            } }}
          >
            Login
          </Button>
        </Box>
      </Box>
      <Grid container sx={{mt:2}}>
        <Grid item xs>
        <Link fullWidth href="#" underline="none" sx={{ m: 1, color: '#e4e4e4' }}>
          Esqueceu, foi?
        </Link>
        </Grid>
        <Grid item>
        <Link fullWidth href="/register" underline="none" sx={{ m: 1, ml:3, color: '#0E1428' }}>
          Faz a Conta aí!
        </Link>
        </Grid>
      </Grid>
      {error && (
        <span style={{ color: "red", textAlign: "center", marginTop: "5%" }}>
          Algo de errado não está certo!
        </span>
      )}
    </Container>
  );
}
