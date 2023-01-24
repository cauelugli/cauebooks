import { useContext, useEffect, useState } from "react";

import axios from "axios";

import { Box, CardContent, Link, Typography } from "@mui/material";

import { Context } from "../../context/Context";

export default function Favorites() {
  // eslint-disable-next-line
  const { user, dispatch } = useContext(Context);
  const [likesList, setLikesList] = useState("");
  const [favoritesList, setFavoritesList] = useState("");

  useEffect(() => {
    const getFavorites = async () => {
      const res = await axios.get("/users/" + user._id);
      console.log("res.data", res.data);
      setLikesList(res.data.likesList);
      setFavoritesList(res.data.favoritesList);
    };
    getFavorites();
  }, [user]);

  const finalFavoritesList = [];
  const finalLikesList = [];

  for (let i = 0; i < favoritesList.length; i++) {
    finalFavoritesList.push(
      <Typography>
        <Link href={`/post/${favoritesList[i].id}`} underline="none" color="grey.700">
          {favoritesList[i].name}
        </Link>
      </Typography>
    );
  }

  for (let i = 0; i < likesList.length; i++) {
    finalLikesList.push(
      <Typography>
        <Link href={`/post/${likesList[i].id}`} underline="none" color="grey.700">
          {likesList[i].name}
        </Link>
      </Typography>
    );
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
          color: "#0E1428",
          border: "3px solid",
          backgroundColor: "#f1f1f0e3",
          borderColor: "grey.400",
          borderRadius: 3,
          width: "75%",
        }}
      >
        <CardContent>
          <Typography
            align="center"
            sx={{ fontSize: "24px", color: "grey.700", m: "2%" }}
          >
            Posts Favoritos &#11088;
          </Typography>
          <Box
            sx={{
              color: "#0E1428",
              border: "3px solid",
              backgroundColor: "#f1f1f0e3",
              borderColor: "grey.300",
              borderRadius: 3,
              padding: 2,
            }}
          >
            {finalFavoritesList}
          </Box>

          <Typography
            align="center"
            sx={{ fontSize: "24px", color: "grey.700", m: "2%" }}
          >
            Posts Curtidos &#9829;
          </Typography>
          <Box
            sx={{
              color: "#0E1428",
              border: "3px solid",
              backgroundColor: "#f1f1f0e3",
              borderColor: "grey.300",
              borderRadius: 3,
              padding: 2,
            }}
          >
            {finalLikesList}
          </Box>
        </CardContent>
      </Box>
    </Box>
  );
}
