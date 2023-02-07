import React, { useEffect, useState } from "react";
import axios from "axios";

import { Typography, Box, Grid, Divider, Link } from "@mui/material";

export default function Home() {
  const [recentLikedTitle, setRecentLikedTitle] = useState("");
  const [recentCommented, setRecentCommented] = useState("");
  const [recentAddedList, setRecentAddedList] = useState([]);

  useEffect(() => {
    const getHomePage = async () => {
      const { data } = await axios.get("/posts");
      setRecentLikedTitle(data.homepage[0].recentLiked[0].title);
      setRecentCommented(data.homepage[0].recentCommented[0].title);

      const provList = [];
      const provIconList = [];

      for (let i = 0; i < data.homepage[0].recentAdded.length; i++) {
        provList.push(
          <Box
            sx={{
              p: 2,
              my: 2,
              color: "#0E1428",
              border: "3px solid",
              backgroundColor: "#f1f1f0e3",
              borderColor: "grey.400",
              borderRadius: 3,
              width: "auto",
              minWidth: "550px",
            }}
          >
            <Grid container direction="row" justifyContent="space-between">
              <Link
                href={`/post/${data.homepage[0].recentAdded[i].postId}`}
                underline="none"
              >
                <Typography
                  sx={{ fontStyle: "oblique", color: "grey.800" }}
                  variant="h6"
                >
                  {data.homepage[0].recentAdded[i].title}
                </Typography>
                <div dangerouslySetInnerHTML={{ __html: provIconList }} />
              </Link>
            </Grid>
          </Box>
        );
      }
      setRecentAddedList(provList);
    };
    getHomePage();
  }, []);

  return (
    <Grid>
      <Box sx={{ py: 3 }}>
        <Typography variant="h3" align="center" sx={{ py: 1 }}>
          cauebooks
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary">
          Salve salve! Seja sempre bem-vindo!
        </Typography>
      </Box>

      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{
          pb: "25%",
          mt: "3%",
        }}
      >
        {/*Left Box - Atividade */}
        <Box
          sx={{
            py: 2,
            px: 4,
            ml: "2%",
            color: "#0E1428",
            border: "3px solid",
            backgroundColor: "#f1f1f0e3",
            borderColor: "grey.400",
            borderRadius: 3,
            width: "auto",
            maxWidth: "250px",
          }}
        >
          <Grid container justifyContent="center">
            <Typography variant="h5">Atividade Recente</Typography>
          </Grid>
          <Divider sx={{ m: 1, my: 3 }} />
          <Grid container justifyContent="center">
            <Typography variant="h6">Novo Like &#128077;</Typography>

            <Grid container justifyContent="center">
              <Typography sx={{ fontStyle: "oblique", color: "#5f5f5f" }}>
                "{recentLikedTitle}"
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ m: 1, my: 3 }} />
          <Grid container justifyContent="center">
            <Typography variant="h6">Novo Comentário &#128172;</Typography>
          </Grid>
          <Grid container justifyContent="center">
            <Typography sx={{ fontStyle: "oblique", color: "#5f5f5f" }}>
              "{recentCommented}"
            </Typography>
          </Grid>
          <Divider sx={{ m: 1, my: 3 }} />
        </Box>

        {/*Middle Box - Recent Texts */}
        <Box
          sx={{
            p: 2,
            px: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#0E1428",
            border: "3px solid",
            backgroundColor: "#f1f1f0e3",
            borderColor: "grey.400",
            borderRadius: 3,
            width: "auto",
            minWidth: "550px",
          }}
        >
          <Grid container justifyContent="center">
            <Typography variant="h5">Novos Textos</Typography>
          </Grid>
          <Divider sx={{ my: 2 }} />
          {recentAddedList}
        </Box>

        {/*Right Box - New Features */}
        <Box
          sx={{
            py: 2,
            px: 4,
            mr: "2%",
            color: "#0E1428",
            border: "3px solid",
            backgroundColor: "#f1f1f0e3",
            borderColor: "grey.400",
            borderRadius: 3,
            width: "auto",
            maxWidth: "250px",
          }}
        >
          <Grid container justifyContent="center">
            <Typography variant="h5">Atualizações</Typography>
          </Grid>
          <Divider sx={{ m: 1, my: 3 }} />
          <Grid container justifyContent="center">
            <Typography variant="h6">Próximas &#128640;</Typography>

            <Grid container justifyContent="center">
              <Typography sx={{ fontStyle: "oblique", color: "#5f5f5f" }}>
                "Alguma coisa muito dahora!"
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ m: 1, my: 3 }} />
        </Box>
      </Grid>
    </Grid>
  );
}
