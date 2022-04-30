import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const cards = [1, 2, 3, 4];

export default function Home() {
  return (
    <>
      <Box sx={{ pt: 3, pb: 10 }}>
        <Container>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            sx={{ m: 3, my: 6 }}
          >
            cauebooks
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Salve salve! Seja sempre bem-vindo!
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
        </Container>
      </Box>
      <Container>
        {/* <LatestPost />
           <LikedstPost />
           <FavoritePost />
           <ComentedstPost /> */}
        <Grid container spacing={3}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} md={3}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardMedia component="img" />
                <img src={window.location.origin + "/1.png"} alt="" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Post Title
                  </Typography>
                  <Typography>
                    This is a content part. Very fucking nice.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}