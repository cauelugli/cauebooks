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