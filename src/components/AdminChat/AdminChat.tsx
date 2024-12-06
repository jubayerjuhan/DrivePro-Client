import { toast } from "material-react-toastify";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import { getConversations } from "../../api_calls/message_api";
import logo from "../../assets/logo.png";
import Avatar from "@mui/material/Avatar";
import { Conversation, State } from "../../typings/reduxTypings";
import AdminChatbox from "../AdminChatbox/AdminChatbox";
import { io } from "socket.io-client";
import "./AdminChat.scss";
import { WEBSOCKET_URL } from "../../client";
import HelmetTitle from "../HelmetTitle/HelmetTitle";

const AdminChat = () => {
  const [convos, setConvos] = useState<Conversation[]>();
  const { admin } = useSelector((state: State) => state.admin);
  const [socket, setSocket] = useState<Socket>();
  const [selectedConvo, setSetSelectedConvo] = useState<any>("");
  const [adminSocketId, setAdminSocketId] = useState<string>("");
  const [userSockets, setUserSockets] = useState<any[]>([]);
  const [newAdminMessage, setNewAdminMessage] = useState<any>({});
  useEffect(() => {
    const socket = io(WEBSOCKET_URL);
    setSocket(socket);
  }, []);

  useEffect(() => {
    getConvos();
  }, [newAdminMessage]);

  // adding admin to the user
  useEffect(() => {
    socket?.emit("add_user", { type: "admin", userId: admin?._id });

    // getting connected sockets
    socket?.on("connected_users", (data) => {
      data?.forEach((connectedSocket: any) => {
        if (connectedSocket.type === "admin")
          setAdminSocketId(connectedSocket?.socketId);
      });
      setUserSockets(data);
    });

    // recieve message
    socket?.on("recieve_message_admin", (data) => {
      setNewAdminMessage(data);
    });
  }, [admin, socket]);

  // console.log()
  const getConvos = async () => {
    const data = await getConversations();
    if (data.success) return setConvos(data?.conversations);
  };

  console.log(userSockets, "all user sockets 55");
  return (
    <div className="adminChat__main">
      <HelmetTitle title={`Live Chat - Admin`} />

      <div className="adminChat__sidebar">
        <div className="adminChat__logo">
          <a href="/">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="adminChat__conversations">
          {convos?.map((convo, key) => (
            <div
              className="adminChat__conversation"
              key={key}
              onClick={() => setSetSelectedConvo(convo._id)}
            >
              <div className="image">
                {convo?.avater ? (
                  <img src={convo.avater} alt="" />
                ) : (
                  <Avatar>{convo?.firstName?.charAt(0)}</Avatar>
                )}
              </div>
              <p className="name">
                {convo?.firstName} {convo?.lastName}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="adminChat__chatcontainers">
        {selectedConvo ? (
          <AdminChatbox
            socket={socket ? socket : ""}
            userSockets={userSockets}
            selectedConvo={selectedConvo}
            newAdminMessage={newAdminMessage}
          />
        ) : (
          <div className="no__convo__selected">
            <p className="title">Please Select a Conversation...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
