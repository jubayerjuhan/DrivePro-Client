import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import "./AdminChatbox.scss";

import {
  getConversationMessages,
  sendMessageToServer,
} from "../../api_calls/message_api";
import { FaTimesCircle } from "react-icons/fa";

import { toast } from "material-react-toastify";
import { io, Socket } from "socket.io-client";
import { Message, User } from "../../typings/reduxTypings";
import InfoIcon from "@mui/icons-material/Info";
import { getSingleUserAdmin } from "../../api_calls/Admin/admin_userapi";
import { uploadFileToCloud } from "../../api_calls/user_api";
import { Avatar, CircularProgress } from "@mui/material";
interface Props {
  selectedConvo: string;
  newAdminMessage: any;
  userSockets: any;
  socket: any;
}
const AdminChatbox = ({
  selectedConvo,
  newAdminMessage,
  userSockets,
  socket,
}: Props) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [serverMessages, setServerMessages] = useState<Message[]>([]);
  const [userInformation, setUserInformation] = useState<User>();
  const [newMessage, setNewMessage] = useState<string>(" ");
  const [sending, setSending] = useState<boolean>(false);
  // const [socket, setSocket] = useState<Socket>();
  const scrollRef = useRef<any>();
  console.log(selectedConvo);

  // console.log(socket, "socket information");
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [serverMessages]);

  // get current user information
  useEffect(() => {
    getuserInformation();
  }, [selectedConvo]);

  // get single user
  const getuserInformation = async () => {
    const data = await getSingleUserAdmin(selectedConvo);
    setUserInformation(data?.user);
  };

  useEffect(() => {
    getServerMessages();
  }, [selectedConvo, newAdminMessage, sending]);

  const getServerMessages = async () => {
    const data = await getConversationMessages(selectedConvo);
    if (!data?.success) return toast.error(data?.message);
    console.log(data);
    setServerMessages(data?.messages);
  };

  const sendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (selectedFile) {
      setUploading(true);
      const { success, message, file } = await uploadFileToCloud(selectedFile);
      setUploading(false);
      // if error in uploading file
      if (!success) return alert(message);

      await sendMessageToDb(file, selectedFile?.type, selectedFile.name);
      setSelectedFile(null);
    } else {
      await sendMessageToDb();
    }
    // send message wih socket
    const userToSend = userSockets.find(
      (socket: any) => socket.userId === selectedConvo
    );

    console.log(userToSend, userSockets, "user");

    socket?.emit("send__message", {
      // hello: "world",
      message: newMessage,
      from: "admin",
      to: userToSend?.socketId,
    });
  };

  // send message to database function
  const sendMessageToDb = async (
    message = newMessage,
    type = "text",
    name = ""
  ) => {
    setNewMessage("");
    setSending(true);
    // ----------------------------------------------
    const data = await sendMessageToServer(
      message,
      "admin",
      type,
      name,
      selectedConvo
    );

    if (!data?.success) {
      toast.error(data?.message);
      return setSending(false);
    }
    if (data) setSending(false);
  };

  // send message to db

  console.log(newMessage);

  return (
    <div className="admin__chatbox">
      <div className="chatbox__header">
        <div className="chatbox__header-user">
          {userInformation?.avater ? (
            <img src={userInformation?.avater} alt="" />
          ) : (
            <Avatar>{userInformation?.firstName?.charAt(0)}</Avatar>
          )}
          <p className="title">
            {userInformation?.firstName} {userInformation?.lastName}
          </p>
        </div>
        <div className="chatbox__header-userInfo">
          <a
            href={`/admin/user/${selectedConvo}`}
            target={"_blank"}
            rel={"noopener"}
          >
            <InfoIcon />
          </a>
        </div>
      </div>
      {uploading && (
        <div className="uploading__spinner-main">
          <CircularProgress size={20} />
          <p className="title">Uploading Your File</p>
        </div>
      )}
      <div className="chatbox__main">
        {serverMessages?.map((message, key) => {
          return (
            <div
              ref={scrollRef}
              className={`${
                message.from === "admin" ? "chat-rec" : "chat-sent"
              }`}
            >
              {message?.messageType !== "text" ? (
                <p className={"message__with-attachment"}>
                  <AttachFileIcon />
                  <a target={"_blank"} href={message?.text}>
                    {message?.fileName}
                  </a>
                </p>
              ) : (
                <p>{message?.text}</p>
              )}
            </div>
          );
        })}
        <div className="chat__send-opts">
          <form className="chat__inputs" action="" onSubmit={sendMessage}>
            {selectedFile && (
              <div className={"selected__file-name"}>
                <p className={"title"}>{selectedFile?.name.slice(0, 15)}</p>
                <FaTimesCircle onClick={() => setSelectedFile("")} />
              </div>
            )}

            {
              <input
                type="text"
                name="message"
                id=""
                value={newMessage}
                className="message"
                onChange={(e) => setNewMessage(e.target.value)}
              />
            }
            <label htmlFor="upload" className="upload">
              <AttachFileIcon />
              <input
                type="file"
                id="upload"
                className="fileupload"
                onChange={(e: any) => setSelectedFile(e.target?.files[0])}
              />
            </label>
            <SendIcon className="sendIcon" onClick={sendMessage} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminChatbox;
