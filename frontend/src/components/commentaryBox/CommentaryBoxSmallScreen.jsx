import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";

import axios from "axios";

import {
  Box,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import { Context } from "../../context/Context";
import CheckButton from "../checkButton/CheckButton";

const api = axios.create({
  baseURL: (process.env.DEV_API_URL || "http://api.cauebooks.com.br/api"),
});

const CommentaryBoxSmallScreen = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const crypto = require("crypto");
  function generateRandomString(length) {
    return crypto.randomBytes(length).toString("hex");
  }

  const randomString = generateRandomString(10);

  const [displayCommentaries, setDisplayCommentaries] = useState(false);
  const [displayAddComment, setDisplayAddCommentary] = useState(false);

  const [commentaries, setCommentaries] = useState([]);
  const [posted, setPosted] = useState("");
  const [comment, setComment] = useState("");
  const [selectedToDelete, setSelectedToDelete] = useState("");
  const [openDeleteCommentaryModal, setOpenDeleteCommentaryModal] =
    useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await api.get("/posts/" + postId);
      setCommentaries(res.data.commentaries);
      setPosted(
        new Date(res.data.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
        })
      );
    };
    getPost();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/posts/comment/" + postId, {
        user: {
          username: user.username,
          avatar: user.avatar,
          user_id: user._id,
        },
        comment,
        date: posted,
        commentary_id: randomString,
      });
      setComment("");
      setDisplayAddCommentary(false);
      setCommentaries([
        ...commentaries,
        {
          username: user.username,
          user_id: user._id,
          avatar: user.avatar,
          commentary_id: randomString,
          comment,
          date: posted,
        },
      ]);
    } catch (err) {
      alert("Vish, não rolou o comentário não...");
      console.log(err);
    }
  };

  const handleDeleteCommentary = async () => {
    const commentIndex = commentaries.findIndex(
      (c) => c.commentary_id === selectedToDelete
    );
    if (commentIndex !== -1) {
      commentaries.splice(commentIndex, 1);
    }

    try {
      await api.put("/posts/delcomment/" + postId, {
        commentary_id: selectedToDelete,
      });
      setOpenDeleteCommentaryModal(false);
      setCommentaries([...commentaries]);
    } catch (err) {
      setOpenDeleteCommentaryModal(false);
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

  const handleDeleteCommentaryConfirmation = () => {
    setOpenDeleteCommentaryModal(true);
  };

  const handleCloseDeleteCommentaryModal = () => {
    setOpenDeleteCommentaryModal(false);
  };

  const commentariesList = [];

  for (let i = 0; i < commentaries.length; i++) {
    commentariesList.push(
      <Box
        onClick={() => {
          setSelectedToDelete(commentaries[i].commentary_id);
        }}
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
          width: "100%",
          maxWidth: "330px",
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
            padding: 1,
          }}
        >
          <Typography sx={{ fontSize: 18 }}>
            {commentaries[i].comment}
          </Typography>
        </Box>

        {commentaries[i].user_id === user._id && (
          <Grid justifyContent="flex-end" sx={{ marginLeft: "auto" }}>
            <MenuItem
              sx={{
                color: "grey.800",
                "&:hover": {
                  color: "grey.800",
                  backgroundColor: "transparent",
                },
              }}
              onClick={() => handleDeleteCommentaryConfirmation("params")}
              onClose={handleCloseDeleteCommentaryModal}
            >
              <DeleteIcon sx={{ mr: 1 }} />
            </MenuItem>
          </Grid>
        )}
      </Box>
    );
  }

  return (
    <>
      {!displayCommentaries ? (
        <Grid container justifyContent="center">
          <Grid container justifyContent="center">
            <Typography
              sx={{
                fontSize: 12,
                fontStyle: "oblique",
                color: "grey.700",
                pt: 5,
              }}
            >
              Comentários
            </Typography>
          </Grid>
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
          <Grid container justifyContent="center">
            <Typography
              sx={{
                fontSize: 12,
                fontStyle: "oblique",
                color: "grey.700",
                pt: 5,
              }}
            >
              Ocultar
            </Typography>
          </Grid>
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
                  sx={{ ml: 1, backgroundColor: "#e4e4e4" }}
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

      <Dialog
        open={openDeleteCommentaryModal}
        onClose={handleCloseDeleteCommentaryModal}
      >
        <DialogTitle>
          Das duas, uma: Ou gigitou errado, ou falou besteira... Ainda bem que
          dá pra apagar né :)
        </DialogTitle>
        <Divider />
        <DialogActions>
          <Button variant="inherit" onClick={handleCloseDeleteCommentaryModal}>
            Mas eu não quero apagar...
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteCommentary}
            autoFocus
          >
            Ainda bem né, apaga isso aí kkk
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CommentaryBoxSmallScreen;
