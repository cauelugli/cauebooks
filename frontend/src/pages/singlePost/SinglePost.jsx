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
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setTitle(res.data.title);
      setDesc(res.data.desc);
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
          <p className="singlePostDesc">{desc}</p>
        </Paper>
      </Box>
      
    </div>
  );
}
