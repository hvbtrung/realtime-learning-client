import "./ChatScreen.scss";
import * as React from "react";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import socketIOClient from "socket.io-client";
import axiosInstance from "../../utils/axiosInstance";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const userInfo = JSON.parse(localStorage.getItem("user"));

export default function ChatScreen({
  isOpenChat,
  closeChatDialog,
  setTypeNotification,
  setMessageNotification,
  setIsAppearNotification,
}) {
  const [chatContent, setChatContent] = useState("");
  const [userId] = useState(userInfo._id);
  const [nameUser] = useState(userInfo.name);

  const chatInput = useRef();

  const socketRef = useRef();
  const messagesEnd = useRef();
  let pathname = window.location.pathname.slice("/presentations/".length);
  let presentationId = pathname.replace("/slides", "");
  presentationId = presentationId.replace("/execute", "");

  const [contentChats, setContentChats] = useState([]);

  useEffect(() => {
    getAllMessages();
    setTypeNotification("success");

    socketRef.current = socketIOClient.connect(process.env.REACT_APP_API_URL);
    socketRef.current.emit("createRoom", presentationId);
    socketRef.current.on("sendMessageToClient", handleReceiveMessage);

    return () => {
      socketRef.current.disconnect();
    };

    // eslint-disable-next-line
  }, []);

  const saveMessage = async () => {
    await axiosInstance.post(`/api/messages`, {
      data: {
        message: chatContent,
        presentationId: presentationId,
      },
    });
  };

  const getAllMessages = async () => {
    const res = await axiosInstance.get(
      `/api/messages?presentationId=${presentationId}`
    );

    const oldMessages = res.data.messages;
    setMessageNotification("");
    setContentChats(
      oldMessages.map((item) => {
        return {
          name: item.sender.name,
          type: userId === item.sender._id ? "right" : "left",
          content: item.message,
        };
      })
    );
    scrollToBottom();
  };

  const handleReceiveMessage = (receivedData) => {
    setContentChats((prevContentChats) => [
      ...prevContentChats,
      {
        name: receivedData.name,
        type: userId === receivedData.userId ? "right" : "left",
        content: receivedData.message,
      },
    ]);

    if (userId !== receivedData.userId) {
      setMessageNotification("You have new message");
      setIsAppearNotification((prev) => !prev);
    }

    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (isOpenChat === true) {
      messagesEnd.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  const sendMessage = () => {
    socketRef.current.emit("sendMessageToServer", {
      message: chatContent,
      userId: userId,
      name: nameUser,
    });
  };

  const handleSendChatContent = () => {
    if (chatContent.length === 0) {
      return;
    }
    sendMessage();
    saveMessage();
    setChatContent("");

    chatInput.current.focus();
  };

  const messageRender = contentChats.map((content, index) => {
    return (
      <Box
        className={`chatContent__item ${content.type === "left" || "right"}`}
        key={index}
        ref={messagesEnd}
      >
        <Box className="chatContent__item--avatar">
          <Avatar sx={{ width: 25, height: 25 }} alt="User Avatar">
            M
          </Avatar>
        </Box>
        <Box>
          <small className="chatContent__item--nameUser">{content.name}</small>
          <Typography gutterBottom className="chatContent__item--content">
            {content.content}
          </Typography>
        </Box>
      </Box>
    );
  });

  return (
    <div>
      <BootstrapDialog
        onClose={closeChatDialog}
        aria-labelledby="Chat-Dialog-Title"
        open={isOpenChat}
        className="Chat-Dialog-Title"
      >
        <BootstrapDialogTitle id="Chat-Dialog-Title" onClose={closeChatDialog}>
          Chat
        </BootstrapDialogTitle>
        <DialogContent className="chatContent">
          {messageRender}

          <div id="messageEnd" ref={messagesEnd} />
        </DialogContent>

        <DialogActions className="ChatInput">
          <input
            className="ChatInput--content"
            value={chatContent}
            onChange={(e) => {
              setChatContent(e.target.value);
            }}
            placeholder="Type your content..."
            ref={chatInput}
            text="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendChatContent();
              }
            }}
          />

          <Tooltip className="ChatInput--icon" onClick={handleSendChatContent}>
            <IconButton>
              <SendIcon />
            </IconButton>
          </Tooltip>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
