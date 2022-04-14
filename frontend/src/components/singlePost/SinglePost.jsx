import "./singlePost.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Context } from "../../context/Context";
import { Box, Paper, Typography } from "@mui/material";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  // eslint-disable-next-line
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className="singlePost">
      <Box className="singlePostBox"
        sx={{
          display: 'flex',
          backgroundColor: "red",
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '100%',
          },
        }}>
        <Paper elevation={3}>
          <Typography variant="h1" className="singlePostTitle">{title}</Typography>
          <p className="singlePostDesc">{desc}</p>
        </Paper>
      </Box>
      {/* <div className="singlePostWrapper">
        <div className="singlePostInfo">
          <span className="singlePostDate">
            {new Date(post.createdAt).toLocaleDateString('pt-BR', dateOptions)}
          </span>
        </div>
        
        <div className="singlePostEdit">
          <i className="singlePostIconThumbsUp far fa-thumbs-up"></i>
          <i className="singlePostIconStar far fa-star"></i>
          <i className="singlePostIconDots far fa-comment-dots"></i>
        </div>
      </div> */}
    </div>
  );
}
