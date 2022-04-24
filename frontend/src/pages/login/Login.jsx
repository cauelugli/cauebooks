import { useContext, useState } from "react";
import axios from "axios";

import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormControl,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./login.css";

import { Context } from "../../context/Context";

export default function Login() {
  const { dispatch } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

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
    <div className="login">
      <div className="loginWrapper">
        <div className="loginTitle">
          <span className="loginUpdateTitle">Entre em sua Conta!</span>
        </div>

        <form className="loginForm" onSubmit={handleSubmit}>
          <FormControl sx={{ m: 3 }} variant="outlined">
            <InputLabel>Nome de Usuário</InputLabel>
            <OutlinedInput
              type={"text"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Nome de Usuário"
              endAdornment={
                <InputAdornment position="end" edge="end">
                  <Visibility />
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

          <button className="loginSubmit" type="submit">Login</button>
          <a className="loginSubmit" href="/register">Registre-se</a>

          {error && (<span style={{ color: "red", textAlign: "center", marginTop: "5%" }}>Algo de errado não está certo!</span>)}
        </form>

      </div>
    </div>
  );
}
