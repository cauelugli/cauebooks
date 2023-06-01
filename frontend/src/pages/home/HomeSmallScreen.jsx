import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Typography,
  Grid,
  Link,
  Divider,
  Box,
  Pagination,
} from "@mui/material";

const api = axios.create({
  baseURL: process.env.DEV_API_URL || "https://api.cauebooks.com.br/api",
});

export default function HomeSmallScreen() {
  const [recentAddedList, setRecentAddedList] = useState([]);
  const [recentLikedTitle, setRecentLikedTitle] = useState("");
  const [recentCommented, setRecentCommented] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const textsPerPage = 5;
  const indexOfLastText = currentPage * textsPerPage;
  const indexOfFirstText = indexOfLastText - textsPerPage;
  const currentTexts = recentAddedList.slice(indexOfFirstText, indexOfLastText);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getHomePage = async () => {
      const { data } = await api.get("/posts");
      setRecentLikedTitle(data.homepage[0].recentLiked[0].title);
      setRecentCommented(data.homepage[0].recentCommented[0].title);
      const provList = data.homepage[0].recentAdded.map((item) => ({
        title: item.title,
        postId: item.postId,
      }));
      setRecentAddedList(provList);
    };
    getHomePage();
  }, []);

  return (
    <>
      <Grid
        justifyContent="center"
        sx={{
          p: 2,
          mt: "5%",
          mx: "7%",
          color: "#0E1428",
          backgroundColor: "#f1f1f0e3",
          border: "3px solid",
          borderColor: "grey.400",
          borderRadius: 3,
        }}
      >
        <Grid container justifyContent="center" sx={{ p: 1 }}>
          <Typography variant="h5">Novos Textos ⭐</Typography>
        </Grid>
        <Divider sx={{ m: 1, mx: 2 }} />
        <Grid container justifyContent="center" sx={{ p: 1 }}>
          {currentTexts.map((item, index) => (
            <Box
              key={index}
              sx={{
                p: 1,
                my: 1,
                color: "#0E1428",
                border: "3px solid",
                backgroundColor: "#f1f1f0e3",
                borderColor: "grey.400",
                borderRadius: 3,
                width: "auto",
                minWidth: "290px",
              }}
            >
              <Grid container direction="row" justifyContent="space-between">
                <Link href={`/post/${item.postId}`} underline="none">
                  <Typography
                    sx={{ fontStyle: "oblique", color: "grey.800" }}
                    variant="h6"
                  >
                    {item.title}
                  </Typography>
                </Link>
              </Grid>
            </Box>
          ))}
          <Pagination
            sx={{ mt: 2 }}
            count={Math.ceil(recentAddedList.length / textsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
      <Grid
        justifyContent="center"
        sx={{
          p: 2,
          mt: "5%",
          mx: "7%",
          color: "#0E1428",
          backgroundColor: "#f1f1f0e3",
          border: "3px solid",
          borderColor: "grey.400",
          borderRadius: 3,
        }}
      >
        <Grid container justifyContent="center">
          <Typography variant="h5">Atividade Recente</Typography>
        </Grid>
        <Divider sx={{ mb: 1, mt: 2 }} />
        <Grid container justifyContent="center">
          <Typography variant="h6">Novo Like &#128077;</Typography>

          <Grid container justifyContent="center">
            <Typography sx={{ fontStyle: "oblique", color: "#5f5f5f" }}>
              "{recentLikedTitle}"
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />
        <Grid container justifyContent="center">
          <Typography variant="h6">Novo Comentário &#128172;</Typography>
        </Grid>
        <Grid container justifyContent="center">
          <Typography sx={{ fontStyle: "oblique", color: "#5f5f5f" }}>
            "{recentCommented}"
          </Typography>
        </Grid>
        <Divider sx={{ mt: 2 }} />
      </Grid>
    </>
  );
}
