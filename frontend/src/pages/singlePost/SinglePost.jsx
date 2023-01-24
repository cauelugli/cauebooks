import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

import axios from "axios";

import { Box, CardContent, Grid, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  // eslint-disable-next-line
  const { user, dispatch } = useContext(Context);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [body, setBody] = useState("");
  const [likes, setLikes] = useState("");
  const [likesThisPost, setLikesThisPost] = useState(false);
  const [favorites, setFavorites] = useState("");
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + postId);

      setTitle(res.data.title);
      setCategories(res.data.categories);
      setBody(res.data.body);
      setLikes(res.data.likes);
      setFavorites(res.data.favorites);
    };

    const getUser = async () => {
      const modifiedUser = await axios.get("/users/" + user._id);
      
      if (modifiedUser.data.likesList.includes(postId)) {
        setLikesThisPost(true);
      }
      if (modifiedUser.data.favoritesList.includes(postId)) {
        setFavorite(true);
      }

    };
    
    getPost();
    getUser();
  }, [postId, user]);

  const handleLike = async (e) => {
    e.preventDefault();
    if (!likesThisPost) {
      try {
        await axios.put("/users/like/" + user._id, { likes: postId });
        await axios.put("/posts/" + postId, { likes: likes + 1 });
        setLikes(likes + 1);
        setLikesThisPost(true);
        console.log("user LIKE");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put("/users/unlike/" + user._id, { likes: postId });
        await axios.put("/posts/" + postId, { likes: likes - 1 });
        setLikes(likes - 1);
        setLikesThisPost(false);
        console.log("user UNLIKE");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (!favorite) {
      try {
        await axios.put("/users/favorite/" + user._id, { favorites: postId });
        await axios.put("/posts/" + postId, { favorites: favorites + 1 });
        setFavorites(favorites + 1);
        setFavorite(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put("/users/unfavorite/" + user._id, { favorites: postId });
        await axios.put("/posts/" + postId, { favorites: favorites - 1 });
        setFavorites(favorites - 1);
        setFavorite(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

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
            <IconButton onClick={handleLike}>
              {likesThisPost && (
                <FavoriteIcon sx={{ mx: "1%", color: "#e65940" }} />
              )}
              {!likesThisPost && <FavoriteBorderIcon sx={{ mx: "1%" }} />}
              {likes}
            </IconButton>

            <IconButton onClick={handleFavorite}>
              {!favorite && <StarBorderIcon sx={{ mx: "1%" }} />}
              {favorite && <StarIcon sx={{ mx: "1%", color: "#f2a933" }} />}
              {favorites}
            </IconButton>
          </Grid>
        </CardContent>
      </Box>
    </Box>
  );
}
