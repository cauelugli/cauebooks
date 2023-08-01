import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Context } from "../../context/Context";
import Textarea from "@mui/joy/Textarea/Textarea";

const api = axios.create({
  baseURL: process.env.REACT_APP_DEV_API_URL || "https://api.cauebooks.com.br/api",
});

export default function AdminDialogue() {
  const { user } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [userMessages, setUserMessages] = useState({});
  const [replyInputs, setReplyInputs] = useState({});

  useEffect(() => {
    const getUsersAndMessages = async () => {
      const [usersResponse, messagesResponse] = await Promise.all([
        api.get("/users"),
        api.get("/dialogue"),
      ]);

      const usersData = usersResponse.data;
      const messagesData = messagesResponse.data;

      const userList = usersData.map((user) => ({
        userId: user._id,
        username: user.username,
      }));
      setUsers(userList);

      const mergedMessages = {};
      messagesData.forEach((message) => {
        const { userId, body } = message;
        if (!mergedMessages[userId]) {
          mergedMessages[userId] = [];
        }
        mergedMessages[userId].push(body);
      });
      setUserMessages(mergedMessages);
    };

    getUsersAndMessages();
  }, [user._id]);

  const handleReplyChange = (userId, event) => {
    setReplyInputs((prevInputs) => ({
      ...prevInputs,
      [userId]: event.target.value,
    }));
  };

  const handleReplySubmit = async (userId) => {
    const body = replyInputs[userId];

    if (body) {
      const dialogueFormData = {
        userId,
        body,
        fromUser: false,
      };
      try {
        console.log('dialogueFormData', dialogueFormData)
        await api.post("/dialogue", dialogueFormData);
        setReplyInputs((prevInputs) => ({
          ...prevInputs,
          [userId]: "",
        }));
        // Atualizar as mensagens após o envio da resposta
        const { data } = await api.get("/dialogue");
        const mergedMessages = {};
        data.forEach((message) => {
          const { userId, body } = message;
          if (!mergedMessages[userId]) {
            mergedMessages[userId] = [];
          }
          mergedMessages[userId].push(body);
        });
        setUserMessages(mergedMessages);
      } catch (err) {
        alert("Vish, try again...");
        console.log(err);
      }
    }
  };

  return (
    <Box
      sx={{
        mt: 3,
        mx: "2%",
        display: "flex",
        color: "#0E1428",
        border: "3px solid",
        backgroundColor: "#f1f1f0e3",
        borderColor: "grey.400",
        borderRadius: 3,
        height: "100%",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{p:2}}>
          {users.map((user) => (
            <Grid item md={2} lg={2} key={user.userId}>
              <Typography>{user.username}</Typography>
              <Paper sx={{ minHeight: 100, p: 2, mb: 2 }}>
                {userMessages[user.userId] &&
                  userMessages[user.userId].map((message, index) => (
                    <Typography key={index} variant="body1">
                      {message}
                    </Typography>
                  ))}
              </Paper>
              <Textarea
                required
                minRows={3}
                value={replyInputs[user.userId] || ""}
                onChange={(event) => handleReplyChange(user.userId, event)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleReplySubmit(user.userId)}
              >
                Enviar
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
