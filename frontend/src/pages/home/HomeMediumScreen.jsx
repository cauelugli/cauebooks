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

export default function HomeMediumScreen() {
  const [recentAddedList, setRecentAddedList] = useState([]);
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
      const provList = data.homepage[0].recentAdded.map((item) => ({
        title: item.title,
        postId: item.postId,
      }));
      setRecentAddedList(provList);
    };
    getHomePage();
  }, []);

  return (
    <Grid
      justifyContent="center"
      sx={{
        p: 2,
        mt: "5%",
        mx: "7%",
        color: "#0E1428",
        border: "3px solid",
        backgroundColor: "#f1f1f0e3",
        borderColor: "grey.400",
        borderRadius: 3,
      }}
    >
      <Grid container justifyContent="center" sx={{ p: 1 }}>
        <Typography variant="h5">Novos Textos</Typography>
      </Grid>
      <Divider sx={{ m: 2, mx: 7 }} />
      <Grid container justifyContent="center" sx={{ p: 1 }}>
        {currentTexts.map((item, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              my: 1,
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
  );
}
