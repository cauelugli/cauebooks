import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import axios from "axios";

import { Box, CardContent, Grid, Typography } from "@mui/material";

import SinglePostActions from "../../components/singlePostActions/SinglePostActions";

export default function SinglePost() {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + postId);
      setTitle(res.data.title);
      setCategories(res.data.categories);
      setBody(res.data.body);
    };

    getPost();
  });

  let categoriesList = "";
  if (categories) {
    categories.forEach((item) => {
      categoriesList += item + " ";
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        my: "2%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0E1428",
          border: "3px solid",
          backgroundColor: "#f1f1f0e3",
          borderColor: "grey.400",
          borderRadius: 3,
          width: "85%",
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", textAlign: "", margin: "5%" }}>
            <div>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  align="justify"
                  sx={{
                    fontStyle: "italic",
                    fontSize: "36px",
                    color: "grey.800",
                  }}
                >
                  {title}
                </Typography>
              </Box>

              <Typography
                align="right"
                sx={{
                  fontStyle: "italic",
                  color: "grey.700",
                  my: 4,
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: categoriesList }} />
              </Typography>

              <Typography sx={{ color: "grey.800" }}>
                <div dangerouslySetInnerHTML={{ __html: body }} />
              </Typography>
            </div>
          </Box>

          <Grid container justifyContent="flex-end">
            <SinglePostActions />
          </Grid>
        </CardContent>
      </Box>
    </Box>
  );
}
