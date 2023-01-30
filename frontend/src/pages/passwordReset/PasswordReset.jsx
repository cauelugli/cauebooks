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
  Box,
  TextField,
} from "@mui/material";

import { Context } from "../../context/Context";

import GreetSentence from "../../components/greetSentence/GreetSentence";
import CheckButton from "../../components/checkButton/CheckButton";

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
      password,
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
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#0E1428",
            border: "3px solid",
            backgroundColor: "#f1f1f0e3",
            borderColor: "grey.400",
            borderRadius: 3,
          }}
        >
          <Typography sx={{ p: 3, color:"grey.800" }} component="h3" variant="h5">
            Atualize sua Senha
          </Typography>
          <Box component="form" onSubmit={handleUpdate} sx={{ mt: 1 }}>
            <InputLabel sx={{ mt: 2, color:"grey.800" }}>Nova Senha</InputLabel>
            <TextField
              required
              margin="normal"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <CheckButton />
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
