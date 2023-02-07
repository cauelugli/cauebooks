import React, { useContext, useState } from "react";

import axios from "axios";
import Textarea from "@mui/joy/Textarea";

import {
  InputLabel,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Divider,
  Grid,
  Container,
  Box,
  TextField,
  Button,
} from "@mui/material";

import { Context } from "../../context/Context";
import CheckButton from "../../components/checkButton/CheckButton";

export default function Contact() {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const contactFormData = {
      user: { _id: user._id, email: user.email, username: user.username },
      title,
      body,
    };
    try {
      const res = await axios.post("/auth/contact", contactFormData);
      setTitle("");
      setBody("");
      handleModal();
    } catch (err) {
      alert("Vish, try again...");
      console.log(err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        onSubmit={handleUpdate}
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
        <Typography sx={{ p: 4, color: "grey.800" }} variant="h4">
          Mande el Papo Reto
        </Typography>
        <Box sx={{ mt: 2 }}>
          <InputLabel sx={{ color: "grey.800" }}>Título</InputLabel>
          <TextField
            sx={{ color: "grey.800" }}
            margin="normal"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputLabel sx={{ mt: 3, color: "grey.800" }}>Mensagem</InputLabel>
          <Textarea
            sx={{ width: 500 }}
            placeholder='"Miau, miau, miau..."'
            value={body}
            onChange={(event) => setBody(event.target.value)}
            minRows={4}
            endDecorator={
              <Typography level="body3" sx={{ ml: "auto" }}>
                {body.length} caracteres
              </Typography>
            }
          />
        </Box>
        <CheckButton />
        {openModal && (
          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>Aqui só agradece com todas as Forças!</DialogTitle>
            <Divider sx={{ mb: 1, mx: 4 }} />
            <DialogActions>
              <Button
                sx={{
                  color: "#fff",
                  backgroundColor: "#2e2e2e",
                  "&:hover": { color: "#fff", backgroundColor: "#2e2e2e" },
                }}
                onClick={handleCloseModal}
              >
                Pode pá
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Container>
  );
}