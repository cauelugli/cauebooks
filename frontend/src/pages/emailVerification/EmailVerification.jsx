import {Container, CssBaseline, Typography} from "@mui/material";

export default function EmailVerification() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography sx={{ m: 3 }} component="h3" variant="h4">
          Sua conta foi ativada com sucesso! Faz o login ae!
        </Typography>
    </Container>
  );
}
