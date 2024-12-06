import React, { useEffect, useRef, useState } from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { io } from "socket.io-client";

import "./Chat.scss";
import ChatBoxClient from "../ChatBoxClient/ChetBoxClient.jsx";
import { useSelector } from "react-redux";
import { WEBSOCKET_URL } from "../../client.js";
import { Button } from "@mui/material";
// import NotificationSound from "../../assets/mixkit-positive-notification-951.wav";
const Chat = () => {
  const [newMessageRecived, setNewMessageRecived] = useState(false);
  const [recivedMessage, setRecivedMessage] = useState("");
  const [adminSocketId, setAdminSocketId] = useState("");
  const [userSockets, setUserSockets] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [socket, setSocket] = useState();

  // notification sound when message arrive
  const buttonRef = useRef(null);
  useEffect(() => {
    if (!user || user?.type === "learner")
      return console.log("No User Available...");
    const socket = io(WEBSOCKET_URL);

    setSocket(socket);
    console.log(socket, "connected socket");
  }, [user]);

  useEffect(() => {
    if (!user || user?.type === "learner")
      return console.log("No User Available...");
    socket?.emit("add_user", { type: "user", userId: user?._id });

    socket?.on("connected_users", (data) => {
      console.log(data, "connected users...");
      data?.forEach((connectedSocket) => {
        if (connectedSocket.type === "admin")
          return setAdminSocketId(connectedSocket?.socketId);
        setUserSockets([...userSockets, connectedSocket]);
      });
    });

    socket?.on("recieve_message_user", (data) => {
      setRecivedMessage(data?.message);
    });
  }, [user, socket]);

  return (
    <div className="chat__app" style={{ width: open ? "300px" : "unset" }}>
      {recivedMessage && (
        <div className="chat__outer-bubble">
          <p className="title">{recivedMessage.substring(0, 30) + "..."}</p>
        </div>
      )}
      <div
        className="chat__app-main"
        style={{ display: !open ? "none" : "block" }}
      >
        <div className="header">
          <p className="title">Chat With Us</p>
        </div>
        {!user || user?.type === "learner" ? (
          <div className="user__not-available">
            <p className="title">Please Login To Send Chat</p>
            <Button
              title={"Login"}
              style={{ color: "#faa41a" }}
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </Button>
          </div>
        ) : (
          <ChatBoxClient
            open={open}
            recivedMessage={recivedMessage}
            setRecivedMessage={setRecivedMessage}
            socket={socket}
            newMessageRecived={newMessageRecived}
            adminSocket={adminSocketId}
            setNewMessageRecived={setNewMessageRecived}
          />
        )}
      </div>

      <div className="chat__icon" onClick={() => setOpen(!open)}>
        {newMessageRecived && <div className="new__message-bubble"></div>}
        {open ? <CloseIcon /> : <ChatBubbleOutlineIcon />}
      </div>
    </div>
  );
};

export default Chat;
