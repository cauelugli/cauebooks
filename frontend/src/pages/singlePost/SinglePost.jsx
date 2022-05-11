import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

import axios from "axios";

import { Box, Paper, Typography } from "@mui/material";

import { Context } from "../../context/Context";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  // eslint-disable-next-line
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setTitle(res.data.title);
      setCategories(res.data.categories);
      setBody(res.data.body);
    };
    getPost();
  }, [path]);


  return (
    <div className="singlePost">
      <Box className="singlePostBox"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '100%',
          },
        }}>
        <Paper elevation={3}>
          <Typography variant="h3" className="singlePostTitle">{title}</Typography>
          <Typography variant="h6" className="singlePostTitle">{categories}</Typography>
          <p className="singlePostDesc">{body}</p>
        </Paper>
      </Box>
      
    </div>
  );
}
