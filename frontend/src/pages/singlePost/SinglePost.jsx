import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

import axios from "axios";

import { Box, IconButton, Paper, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  // eslint-disable-next-line
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [body, setBody] = useState("");
  const [likes, setLikes] = useState(0);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setTitle(res.data.title);
      setCategories(res.data.categories);
      setBody(res.data.body);
      setLikes(res.data.likes);
      console.log(res.config.url);
    };
    getPost();
  }, [path]);

  // const handleUpdate = async () => {
  //   try {
  //     await axios.put(`/posts/${id}`, {
  //       likes: + 1,
  //     });
  //     alert("You liked the post!")
  //   } catch (err) {
  //     alert("You removed your like!")
  //   }
  // };

  const handleFavorite = () => {
    if (!favorite) {
      // axios.post
      setFavorite(true);
      // this is fake
      setLikes(likes + 1);
    } else {
      // axios.post
      setFavorite(false);
      // this is fake
      setLikes(likes - 1);
    }
  };

  return (
    <div className="singlePost">
      <Box
        className="singlePostBox"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%",
          },
        }}
      >
        <Paper elevation={3}>
          <Typography variant="h3" className="singlePostTitle">
            {title}
          </Typography>
          <Typography variant="h6" className="singlePostTitle">
            {categories}
          </Typography>
          <p className="singlePostDesc">{body}</p>
          <IconButton onClick={handleFavorite} sx={{marginLeft:"92%"}}>
            {!favorite && <FavoriteBorderIcon sx={{marginRight:"8%"}}/>}
            {favorite && <FavoriteIcon sx={{marginRight:"8%"}}/>}
            {likes}
          </IconButton>
        </Paper>
      </Box>
    </div>
  );
}
