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
  baseURL: process.env.REACT_APP_DEV_API_URL || "https://api.cauebooks.com.br/api",
});

export default function HomeMediumScreen() {
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
      <Pagination
        sx={{ mt: 2 }}
        count={Math.ceil(recentAddedList.length / textsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </Grid>
  );
}
