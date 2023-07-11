import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

import { IconButton } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import { Context } from "../../context/Context";

const api = axios.create({
  baseURL: (process.env.REACT_APP_DEV_API_URL || "https://api.cauebooks.com.br/api"),
});

export default function SinglePostActions() {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [likes, setLikes] = useState("");
  const [favorites, setFavorites] = useState("");
  const [likesThisPost, setLikesThisPost] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await api.get("/posts/" + postId);
      setTitle(res.data.title);
      setLikes(res.data.likes);
      setFavorites(res.data.favorites);
    };
    getPost();
  });

  useEffect(() => {
    const getUser = async () => {
      const modifiedUser = await api.get("/users/" + user._id);

      for (let i = 0; i < modifiedUser.data.likesList.length; i++) {
        if (Object.values(modifiedUser.data.likesList[i]).includes(title)) {
          setLikesThisPost(true);
          break;
        }
      }

      for (let i = 0; i < modifiedUser.data.favoritesList.length; i++) {
        if (Object.values(modifiedUser.data.favoritesList[i]).includes(title)) {
          setFavorite(true);
          break;
        }
      }
    };
    getUser();
  });

  const handleLike = async (e) => {
    e.preventDefault();
    if (!likesThisPost) {
      try {
          await api.put("/users/like/" + user._id, { likes: title, id: postId });
          await api.put("/posts/like/" + postId);
        setLikesThisPost(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await api.put("/users/unlike/" + user._id, { likes: title, id: postId });
        await api.put("/posts/unlike/" + postId);
        setLikesThisPost(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (!favorite) {
      try {
        await api.put("/users/favorite/" + user._id, { favorites: title, id: postId });
        await api.put("/posts/favorite/" + postId);
        setFavorite(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await api.put("/users/unfavorite/" + user._id, { favorites: title, id: postId });
        await api.put("/posts/unfavorite/" + postId);
        setFavorite(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <IconButton onClick={handleLike}>
        {!likesThisPost && <FavoriteBorderIcon sx={{ mx: "1%" }} />}
        {likesThisPost && <FavoriteIcon sx={{ mx: "1%", color: "#e65940" }} />}
        {likes}
      </IconButton>

      <IconButton onClick={handleFavorite}>
        {!favorite && <StarBorderIcon sx={{ mx: "1%" }} />}
        {favorite && <StarIcon sx={{ mx: "1%", color: "#f2a933" }} />}
        {favorites}
      </IconButton>
    </>
  );
}
