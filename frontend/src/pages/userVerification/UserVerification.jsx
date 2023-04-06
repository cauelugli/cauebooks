import React, { useState } from "react";

import axios from "axios";

import { Box, Container, Divider, Modal, Typography } from "@mui/material";

import Login from "../login/Login";
import CheckButton from "../../components/checkButton/CheckButton";

const api = axios.create({
  baseURL: process.env.DEV_API_URL,
});

const reqParams = window.location.pathname.replace("/users/activate/", "");
let userId = "";

function setParams() {
  for (let i = 0; i < 24; i++) {
    userId += reqParams[i];
  }
}

setParams();

export default function UserVerification() {
  const [modal, setModal] = useState(false);
  const [done, setDone] = useState(false);

  const handleShowModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const handleSubmit = () => {
    try {
      api.get("/users/activate/" + userId);
      handleShowModal();
      setDone(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!done && (
        <Container component="main" maxWidth="sm">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: "10%",
              marginBottom: "55%",
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
            <Typography sx={{ p: 3, color: "grey.800" }} variant="h4">
              Ativação de Conta - cauebooks
            </Typography>
            <Typography sx={{ p: 3, color: "grey.600" }} variant="h6">
              Manda ver, meu nobre!
            </Typography>
            <CheckButton sx={{ py: "300px" }} />
          </Box>
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
            width: "25%",
            bgcolor: "#e4e4e4",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h5">
            E, C, lente!
          </Typography>
          <Divider />

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Agora é só ser feliz :D
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CheckButton />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
