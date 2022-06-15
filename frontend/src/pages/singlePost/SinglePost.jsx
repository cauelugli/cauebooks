import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { render } from 'react-dom';

import axios from "axios";

import { Box, IconButton, Paper, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

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
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + postId);
      setTitle(res.data.title);
      setCategories(res.data.categories);
      setBody(res.data.body);
      setLikes(res.data.likes);
      if (user.favorites.includes(res.data._id)) {
        setFavorite(true)
      };
    };
    getPost();
  }, [postId, user]);

  const handleFavorite = async (e) => {
    e.preventDefault();
    // working with context / "session"
    if (!favorite) {
      try {
        await axios.put("/users/favorite/" + user._id, {favorites: postId});
        await axios.put("/posts/" + postId, {likes: likes + 1});
        setFavorite(true);
        setLikes(likes + 1);
        dispatch({ type: "FAVORITE", payload: postId });
        
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        await axios.put("/users/unfavorite/" + user._id, {favorites: postId});
        await axios.put("/posts/" + postId, {likes: likes - 1});
        setFavorite(false);
        setLikes(likes - 1);
        dispatch({ type: "UNFAVORITE", payload: postId });
      } catch (err) {
        console.log(err)
      }
    }
  };

  var parser = new DOMParser();
  var htmlDoc = parser.parseFromString(body, 'text/html');
  console.log(htmlDoc.body)
  // search for how to parse body react

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
            <div dangerouslySetInnerHTML={{ __html: body }} />
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
