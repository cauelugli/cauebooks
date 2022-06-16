import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

import axios from "axios";

import { Box, CardContent, Grid, IconButton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

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
  const [favorites, setFavorites] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + postId);
      setTitle(res.data.title);
      setCategories(res.data.categories);
      setBody(res.data.body);
      setLikes(res.data.likes);
      setFavorites(res.data.favorites);
      if (user.favorites.includes(res.data._id)) {
        setFavorite(true);
      }
    };
    getPost();    
  }, [postId, user]);

  const handleLike = async (e) => {
    e.preventDefault();
    // working with context / "session"
    if (!likes) {
      try {
        await axios.put("/posts/" + postId, { likes: likes + 1 });
        setLikes(likes + 1);
        dispatch({ type: "LIKE", payload: postId });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put("/posts/" + postId, { likes: likes - 1 });
        setLikes(likes - 1);
        dispatch({ type: "UNLIKE", payload: postId });
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
        dispatch({ type: "FAVORITE", payload: postId });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put("/users/unfavorite/" + user._id, { favorites: postId });
        await axios.put("/posts/" + postId, { favorites: favorites - 1 });
        setFavorites(favorites - 1);
        setFavorite(false);
        dispatch({ type: "UNFAVORITE", payload: postId });
      } catch (err) {
        console.log(err);
      }
    }
  };

  let categoriesList = "";
  if (categories) {
    categories.forEach(myFunction);

    function myFunction(item) {
      // try to render the components, maybe will fuck the shit up... but anyway...
      categoriesList += item + " "; 
    }
  }

  return (
    <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", margin: "1%"}}>
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
          <Box sx={{display: "flex", textAlign: "", margin: "5%"}}>
            
            <div>

              <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}> 
                <Typography sx={{fontStyle: "italic", fontSize: "40px", color: "grey.800"}}>
                  {title}
                </Typography>
              </Box>


              <Typography sx={{fontStyle: "italic", fontSize: "20px", color: "grey.800", mb: "4%", ml:"75%"}}>
                {categoriesList}
              </Typography>

              <Typography sx={{fontSize: "20px", color: "grey.800"}}>
              <div dangerouslySetInnerHTML={{ __html: body }} />
              </Typography>
              
            </div>
            
          </Box>

          <Grid container justifyContent="flex-end" sx={{ ml: "80%" }}>
            <IconButton onClick={handleLike}>
                {!likes && <FavoriteBorderIcon sx={{ mx: "1%" }} />}
                {likes && <FavoriteIcon sx={{ mx: "1%", color: "#e65940" }} />}
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
