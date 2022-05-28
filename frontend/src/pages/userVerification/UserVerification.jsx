import React, { useState } from "react";

import axios from "axios";

import { Box, Button, CircularProgress, Container, CssBaseline, Divider, Modal, Typography } from "@mui/material";

import Login from '../login/Login';


const reqParams = window.location.pathname.replace('/user/verify/','');
let userId = "";

function setParams() {
  for (let i = 0; i < 24; i++) {
    userId += reqParams[i];
  }
}

setParams()

export default function UserVerification() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [modal, setModal] = useState(false);
  const [done, setDone] = useState(false);

  const handleShowModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const handleSubmit = () => {
    setError(false);
    setLoading(true);
    try {
      axios.put(`/users/${userId}`, { verified: true });
      handleShowModal();
      setLoading(false);
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
      <Typography sx={{ mt: "30%" }} variant="h5">
        Clique no botão para finalizar!
      </Typography>
      <form className="registerForm" onSubmit={handleSubmit}>
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
          {loading ? <CircularProgress /> : "VALIDAR"}
          </Button>
        {error && (<span style={{ color: "red", textAlign: "center", marginTop: "20px" }}>Algo de errado não está certo!</span>)}
      </form>
    </Container>
    } 
    {done && <Login />}
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
          width: 600,
          bgcolor: "#e4e4e4",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h5">
          Boa, mano!
        </Typography>
        <Divider />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {error ? (<span style={{ color: "red", textAlign: "center", marginTop: "20px" }}>Algo de errado não está certo!</span>) : 'Agora é só fazer login, e ser feliz.'}
          
        </Typography>
      </Box>
    </Modal>
    </>
  );
}
