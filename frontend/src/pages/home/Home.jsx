import React, { useEffect, useState } from "react";
import axios from "axios";

import { Typography, Box, Grid } from "@mui/material";

export default function Home() {
  const [recentLikedTitle, setRecentLikedTitle] = useState("");
  //const [recentLikedCategories, setRecentLikedCategories] = useState([]);
  const [recentCommented, setRecentCommented] = useState("");
  //const [posted, setPosted] = useState([]);

  useEffect(() => {
    const getHomePage = async () => {
      const res = await axios.get("/posts");
      setRecentLikedTitle(res.data.homepage[0].recentLiked[0].title);
      //setRecentLikedCategories(res.data.homepage[0].recentLiked[0].categories);
      setRecentCommented(res.data.homepage[0].recentCommented[0].title);
      //setPosted(
        //new Date(res.data.createdAt).toLocaleDateString("pt-BR", {
          //day: "2-digit",
          //month: "short",
        //})
      //);
    };
    getHomePage();
  }, []);

  return (
    <Grid container justifyContent="center">
      <Box
        sx={{
          display: "inline-flex",
          justifyContent: "space-between",
          width: "100%",
          pb: "15%",
        }}
      >
        {/* Left Side Box */}
        <Box
          sx={{
            m: "2%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#0E1428",
              border: "3px solid",
              backgroundColor: "#f1f1f0e3",
              borderColor: "grey.400",
              borderRadius: 3,
              width: "auto",
            }}
          >
            <Typography sx={{ color: "grey.800" }} variant="h6">
              Feed de Atividades Recentes
            </Typography>
            <Typography sx={{p:1}}>
              Likes Recentes
            </Typography>
              {recentLikedTitle}
            <Typography sx={{p:1}}>
              Comentários Recentes
            </Typography>
            {recentCommented}
          </Box>
        </Box>

        {/* Middle Box */}
        <Box
          sx={{
            mt: "1%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "auto",
          }}
        >
          <Typography variant="h3" align="center" sx={{ my: "4%" }}>
            cauebooks
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary">
            Salve salve! Seja sempre bem-vindo!
          </Typography>
          <Box
            sx={{
              p: 3,
              px: 10,
              mt: "3%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#0E1428",
              border: "3px solid",
              backgroundColor: "#f1f1f0e3",
              borderColor: "grey.400",
              borderRadius: 3,
              width: "100%",
            }}
          >
            <Typography sx={{ color: "grey.800" }} variant="h6">
              Box 2 - Texts - Alta Performance enquanto Dá
            </Typography>
          </Box>
          <Box
            sx={{
              p: 3,
              px: 10,
              mt: "3%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#0E1428",
              border: "3px solid",
              backgroundColor: "#f1f1f0e3",
              borderColor: "grey.400",
              borderRadius: 3,
              width: "100%",
            }}
          >
            <Typography sx={{ color: "grey.800" }} variant="h6">
              Box 2 - Texts - Alta Performance enquanto Dá
            </Typography>
          </Box>
        </Box>

        {/* Right Side Box */}
        <Box
          sx={{
            m: "2%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "auto",
          }}
        >
          <Box
            component="form"
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#0E1428",
              border: "3px solid",
              backgroundColor: "#f1f1f0e3",
              borderColor: "grey.400",
              borderRadius: 3,
              width: "100%",
            }}
          >
            <Typography sx={{ color: "grey.800" }} variant="h6">
              New Features
            </Typography>
          </Box>
          <Box
            component="form"
            sx={{
              marginTop: "3%",
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#0E1428",
              border: "3px solid",
              backgroundColor: "#f1f1f0e3",
              borderColor: "grey.400",
              borderRadius: 3,
              width: "100%",
            }}
          >
            <Typography sx={{ color: "grey.800" }} variant="h6">
              Contato
            </Typography>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}
