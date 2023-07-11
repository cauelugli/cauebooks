import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import Textarea from "@mui/joy/Textarea";

import { Box, Button, FormControl, Typography } from "@mui/material";

import { Context } from "../../context/Context";
import SendIcon from "@mui/icons-material/Send";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_DEV_API_URL || "https://api.cauebooks.com.br/api",
});

export default function Dialogue() {
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
        createdAt: item.createdAt,
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
      fromUser: true,
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
      <Box
        sx={{
          p: 2,
          m: 2,
          border: "1px solid",
          backgroundColor: "#fff",
          width: "450px",
        }}
      >
        {messages.map((message, index) => (
          <Box key={index}>
            {message.fromUser ? (
              <>
                <Typography
                  sx={{
                    backgroundColor: "#BDEFD8",
                    p: 1,
                    mt: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                    borderRadius: "10px",
                  }}
                >
                  {message.body}
                </Typography>
                <Typography
                  sx={{
                    fontStyle: "oblique",
                    display: "flex",
                    justifyContent: "flex-end",
                    fontSize: "12px",
                    color: "grey.600",
                  }}
                >
                  Você em {new Date(message.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  sx={{
                    backgroundColor: "grey.400",
                    p: 1,
                    mt: 2,
                    borderRadius: "10px",
                    display: "flex",
                  }}
                >
                  {message.body}
                </Typography>
                <Typography
                  sx={{
                    fontStyle: "oblique",
                    display: "flex",
                    justifyContent: "flex-start",
                    fontSize: "12px",
                    color: "grey.600",
                  }}
                >
                  Cauebooks em {new Date(message.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                </Typography>
              </>
            )}
          </Box>
        ))}
        <FormControl>
          <Textarea
            placeholder="Mande el Papo…"
            minRows={2}
            required
            value={body}
            onChange={(event) => setBody(event.target.value)}
            sx={{ mt: 5 }}
            endDecorator={
              <Box
                sx={{
                  display: "flex",
                  pt: 1,
                  flex: "auto",
                  width: "420px",
                }}
              >
                <Button
                  type="submit"
                  sx={{ ml: "auto" }}
                  onClick={handleSubmit}
                >
                  <SendIcon sx={{ color: "grey.800" }} />
                </Button>
              </Box>
            }
          />
        </FormControl>
      </Box>
    </Box>
  );
}
