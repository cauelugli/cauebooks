import React, { useContext, useState } from "react";

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
  CssBaseline,
  Box,
  TextField,
} from "@mui/material";

import { Context } from "../../context/Context";
import GreetSentence from "../../components/greetSentence/GreetSentence";

export default function Settings() {
  const { user, dispatch } = useContext(Context);

  const [password, setPassword] = useState("");

  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      password
    };
    try {
      await axios.put("/users/" + user._id, updatedUser);
      handleUpdateModal();
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  // do it on the button, not on this page
  const randomGreet = () => {
    const rand = 1 + (Math.random() * (9));
    const ran = rand.toString()[0];
    if (ran === '1')  {
      return "Dahora";
    }
    if (ran === '2')  {
      return "Show";
    }
    if (ran === '3')  {
      return "Massa Véi";
    }
    if (ran === '4')  {
      return "Firmeza";
    }
    if (ran === '5')  {
      return "Classe A";
    }
    if (ran === '6')  {
      return "Pode pa";
    }
    if (ran === '7')  {
      return "É nois";
    }
    if (ran === '8')  {
      return "Fechou";
    }
    if (ran === '9')  {
      return "Valeu";
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
            Atualize sua Senha
          </Typography>
          <Box component="form" onSubmit={handleUpdate} sx={{ mt: 1 }}>
            <InputLabel sx={{mt:2}}>Nova Senha</InputLabel>
            <TextField
              margin="normal"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        
      </Container>

      <Dialog open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <DialogTitle>Sua senha foi atualizada com sucesso!</DialogTitle>
        <Divider />
        <DialogActions>
          <Button
            color="success"
            size="small"
            variant="contained"
            onClick={handleCloseUpdateModal}
            autoFocus
          >
            <GreetSentence />
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
}
