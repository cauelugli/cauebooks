import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

import {
  Box,
  Button,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { Context } from "../../context/Context";
import CheckButton from "../../components/checkButton/CheckButton";

const CommentaryBox = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { user } = useContext(Context);

  const [displayCommentaries, setDisplayCommentaries] = useState(false);
  const [displayAddComment, setDisplayAddCommentary] = useState(false);

  const [commentaries, setCommentaries] = useState([]);
  const [posted, setPosted] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + postId);
      setCommentaries(res.data.commentaries);
      setPosted(new Date(res.data.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short"
      }));
    };
    getPost();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/posts/comment/" + postId, {
        user: { username: user.username, avatar: user.avatar },
        comment,
        date: posted
      });
      setComment("");
      setDisplayAddCommentary(false)
      setCommentaries([
        ...commentaries,
        {
          username: user.username,
          avatar: user.avatar,
          comment,
          date: posted
        },
      ]);
    } catch (err) {
      alert("Vish, não rolou o comentário não...");
      console.log(err);
    }
  };

  const handleDisplayCommentaries = () => {
    setDisplayCommentaries(true);
  };

  const handleHideCommentaries = () => {
    setDisplayCommentaries(false);
    setDisplayAddCommentary(false);
  };

  const handleDisplayAddCommentary = () => {
    setDisplayAddCommentary(true);
  };

  const handleHideAddCommentary = () => {
    setDisplayAddCommentary(false);
  };

  const commentariesList = [];

  for (let i = 0; i < commentaries.length; i++) {
    commentariesList.push(
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          color: "#0E1428",
          border: "3px solid",
          borderColor: "grey.500",
          borderRadius: 3,
          backgroundColor: "#f1f1f0e3",
          my: 2,
          padding: 1,
          width: "50em",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            width="60"
            height="60"
            src={window.location.origin + "/" + commentaries[i].avatar + ".png"}
            alt="avatar"
          />
          <h5>{commentaries[i].username}</h5>
          <h6>{commentaries[i].date}</h6>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#0E1428",
            my: 2,
            backgroundColor: "#f1f1f0e3",
            padding: 1,
          }}
        >
          <Typography>{commentaries[i].comment}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {!displayCommentaries ? (
        <Grid container justifyContent="center">
          <Button
            disableRipple
            disableRippleFocus
            sx={{
              textTransform: "none",
              color: "grey.800",
              backgroundColor: "none",
              border: "none",
              "&:hover": {
                color: "none",
                backgroundColor: "none",
                borderColor: "none",
              },
            }}
            onClick={handleDisplayCommentaries}
          >
            <VisibilityIcon fontSize="large" sx={{ mr: 2 }} />{" "}
            <InsertCommentIcon fontSize="large" />
          </Button>
        </Grid>
      ) : (
        <Grid container justifyContent="center">
          <Button
            disableRipple
            disableRippleFocus
            sx={{
              textTransform: "none",
              color: "grey.800",
              backgroundColor: "none",
              border: "none",
              "&:hover": {
                color: "none",
                backgroundColor: "none",
                borderColor: "none",
              },
            }}
            onClick={handleHideCommentaries}
          >
            <VisibilityOffIcon fontSize="large" sx={{ mr: 2 }} />
            <InsertCommentIcon fontSize="large" />
          </Button>

          <Grid container justifyContent="center" sx={{ mt: "10px" }}>
            <CardContent>
              <Typography sx={{ color: "grey.800", borderColor: "grey.400" }}>
                {commentariesList}
              </Typography>
            </CardContent>

            <Grid container justifyContent="center">
              {!displayAddComment ? (
                <Button sx={{ mt: 1 }} onClick={handleDisplayAddCommentary}>
                  <AddIcon sx={{ color: "#658576" }} fontSize="large" />
                </Button>
              ) : (
                <Button sx={{ mt: 1, mb: 5 }} onClick={handleHideAddCommentary}>
                  <RemoveIcon sx={{ color: "grey.800" }} fontSize="large" />
                </Button>
              )}
            </Grid>
          </Grid>

          {displayAddComment && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <form onSubmit={handleCommentSubmit}>
                <img
                  width="60"
                  height="60"
                  src={window.location.origin + "/" + user.avatar + ".png"}
                  alt="avatar"
                />
                <TextField
                  sx={{ ml: 1, backgroundColor: "#e4e4e4", width: "40em" }}
                  multiline
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder='"Meow, meow, meow..."'
                />

                <Grid container justifyContent="center">
                  <CheckButton />
                </Grid>
              </form>
            </Box>
          )}
        </Grid>
      )}
    </>
  );
};

export default CommentaryBox;
