import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import axios from "axios";

import { Box, CardContent, Grid, Typography } from "@mui/material";

import SinglePostActions from "../../components/singlePostActions/SinglePostActions";
import CommentaryBox from "../../components/commentaryBox/CommentaryBox";

export default function SinglePost() {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [body, setBody] = useState("");
  const [posted, setPosted] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + postId);
      setTitle(res.data.title);
      setCategories(res.data.categories);
      setBody(res.data.body);
      setPosted(new Date(res.data.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit"
      }));
    };

    getPost();
  }, [postId]);

  let categoriesList = "";
  if (categories) {
    categories.forEach((item) => {
      categoriesList += item + " ";
    });
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "2%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0E1428",
            border: "3px solid",
            backgroundColor: "#fff",
            borderColor: "grey.400",
            borderRadius: 3,
            width: "85%",
          }}
        >
          <CardContent>
            {/* Body Box */}
            <Box sx={{ display: "flex", margin: "5%" }}>
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
                  <Typography sx={{pt:1}}>

                  Postado em {posted}
                  </Typography>
                </Typography>

                <Typography sx={{ color: "grey.800" }}>
                  <div dangerouslySetInnerHTML={{ __html: body }} />
                </Typography>
              </div>
            </Box>

            {/* Like and Favorite Icons */}
            <Grid container justifyContent="flex-end">
              <SinglePostActions />
            </Grid>

            {/* Commentary Box */}
            <Grid container justifyContent="center">
              <CommentaryBox />
            </Grid>
          </CardContent>
        </Box>
      </Box>
    </>
  );
}
