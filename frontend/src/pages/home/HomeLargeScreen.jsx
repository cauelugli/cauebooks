import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Typography,
  Box,
  Grid,
  Divider,
  Link,
  Pagination,
} from "@mui/material";

const api = axios.create({
  baseURL: process.env.REACT_APP_DEV_API_URL || "https://api.cauebooks.com.br/api",
});

export default function HomeLargeScreen() {
  const [recentLikedTitle, setRecentLikedTitle] = useState("");
  const [recentCommented, setRecentCommented] = useState("");
  const [recentAddedList, setRecentAddedList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const textsPerPage = 5;
  const indexOfLastText = currentPage * textsPerPage;
  const indexOfFirstText = indexOfLastText - textsPerPage;
  const provList = recentAddedList.slice(indexOfFirstText, indexOfLastText);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getHomePage = async () => {
      const { data } = await api.get("/posts");
      setRecentLikedTitle(data.homepage[0].recentLiked[0].title);
      setRecentCommented(data.homepage[0].recentCommented[0].title);
      const provList = data.posts.map((item) => ({
        title: item.title,
        _id: item._id,
        number: item.number,
        likes: item.likes,
        comentariesCount: item.commentaries.length,
      }));
      setRecentAddedList(provList);
    };
    getHomePage();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      sx={{
        mt: "3%",
      }}
    >
      {/*Left Box - Atividade */}
      <Box
        sx={{
          p: 1,
          ml: "1%",
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
          p: 1,
          px: 2,
          mx: "1%",
          color: "#0E1428",
          border: "3px solid",
          backgroundColor: "#f1f1f0e3",
          borderColor: "grey.400",
          borderRadius: 3,
          width: "auto",
          maxWidth: "590px",
        }}
      >
        <Grid container justifyContent="center">
          <Typography variant="h4">Novos Textos ⭐</Typography>
        </Grid>
        <Divider sx={{ m: 1, my: 3 }} />

        {provList.map((item, index) => (
          <Link href={`/post/${item._id}`} underline="none">
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 2,
                my: 2,
                color: "#0E1428",
                border: "3px solid",
                borderColor: "grey.400",
                borderRadius: 3,
                backgroundColor: "#fff",
                width: "auto",
                minWidth: "550px",
              }}
            >
              <Box sx={{ p: 1 }}>
                {item.number < 10 ? "#00" : item.number < 99 ? "#0" : "#"}
                {item.number}
              </Box>
              <Box sx={{ px: "5%" }}>
                <Typography
                  sx={{ fontStyle: "oblique", color: "grey.800" }}
                  variant="h6"
                >
                  {item.title}
                </Typography>
              </Box>
              <Box sx={{ p: 1 }}>
                🖤 {item.likes}
                💬 {item.comentariesCount}
              </Box>
            </Box>
          </Link>
        ))}
        <Divider sx={{ m: 1, my: 3 }} />
        <Pagination
          count={Math.ceil(recentAddedList.length / textsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>

      {/*Right Box - New Features */}
      <Box
        sx={{
          p: 1,
          mr: "1%",
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
          <Typography variant="h5">Notícias 📰</Typography>
        </Grid>
        <Divider sx={{ m: 1, my: 3 }} />
        <Grid container justifyContent="center">
          <Typography variant="h6">Atualizações &#128640;</Typography>
          <Grid container justifyContent="center">
            <Typography sx={{ fontStyle: "oblique", color: "#5f5f5f" }}>
              "Agora temos uma seção de Diálogo, ao invés de um chato Contato. Experimenta pô, <a href="/dialogue">manda uma mensagem :D</a>"
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ m: 1, my: 3 }} />
      </Box>
    </Grid>
  );
}
