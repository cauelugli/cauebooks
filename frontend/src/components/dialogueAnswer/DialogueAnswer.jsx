import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import Textarea from "@mui/joy/Textarea";

import { Box, Paper, Typography } from "@mui/material";

import { Context } from "../../context/Context";
import CheckButton from "../checkButton/CheckButton";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_DEV_API_URL || "https://api.cauebooks.com.br/api",
});

export default function DialogueAnswer() {
  const { user } = useContext(Context);
  const [body, setBody] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getDialoguePage = async () => {
      const { data } = await api.get("/dialogue/" + user._id);
      const provList = data.map((item) => ({
        userId: item.userId,
        body: item.body,
        fromUser: item.fromUser,
        read: item.read,
      }));
      setMessages(provList);
    };
    getDialoguePage();
  }, [user._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dialogueFormData = {
      userId: user._id,
      body,
    };
    try {
      await api.post("/dialogue", dialogueFormData);
      setBody("");
    } catch (err) {
      alert("Vish, try again...");
      console.log(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 3,
        mx: "10%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#0E1428",
        border: "3px solid",
        backgroundColor: "#f1f1f0e3",
        borderColor: "grey.400",
        borderRadius: 3,
      }}
    >
      <Box sx={{ p: 3, border: "2px solid" }}>
        {messages.map((message, index) => (
          <Paper key={index} sx={{ m: 1, p: 1 }}>
            <p>User ID: {message.userId}</p>
            {message.userId === user._id ? (
              <Typography sx={{ color: "red" }}>{message.body}</Typography>
            ) : (
              <Typography sx={{ color: "blue" }}>{message.body}</Typography>
            )}
            <p>
              From Admin: {message.userId === "63dd385ca4f4072b18904122" ? "True" : "False"}
            </p>
            <p>Read: {message.read ? "True" : "False"}</p>
          </Paper>
        ))}
        <Textarea
          required
          placeholder='"Miau, miau, miau..."'
          value={body}
          onChange={(event) => setBody(event.target.value)}
          minRows={4}
        />
        <CheckButton />
      </Box>
    </Box>
  );
}
