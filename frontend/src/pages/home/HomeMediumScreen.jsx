import React, { useEffect, useState } from "react";
import axios from "axios";

import { Typography, Grid, Link } from "@mui/material";

export default function HomeMediumScreen() {
  const [recentAddedList, setRecentAddedList] = useState([]);

  useEffect(() => {
    const getHomePage = async () => {
      const { data } = await axios.get("/posts");
      const provList = [];
      const provIconList = [];

      for (let i = 0; i < data.homepage[0].recentAdded.length; i++) {
        provList.push(
          <Grid
            container
            direction="row"
            sx={{
              p: 1,
              m: 1,
              color: "#0E1428",
              border: "3px solid",
              backgroundColor: "#f1f1f0e3",
              borderColor: "grey.400",
              borderRadius: 3,
              width: "50%",
            }}
          >
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
        );
      }
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
        mx: "10%",
        mb: "50%",
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
      <Grid container justifyContent="center" sx={{ p: 1 }}>
        {recentAddedList}
      </Grid>
    </Grid>
  );
}
