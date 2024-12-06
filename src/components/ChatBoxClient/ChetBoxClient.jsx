import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { FaTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";

import {
  addConversation,
  getMessages,
  sendMessageToServer,
} from "../../api_calls/message_api";
import { toast } from "material-react-toastify";
import { uploadFileToCloud } from "../../api_calls/user_api";
import { truncateStr } from "../../utils/truncateString.js";

const ChatBoxClient = ({
  open,
  setRecivedMessage,
  setNewMessageRecived,
  newMessageRecived,
  recivedMessage,
  adminSocket,
  socket,
}) => {
  const scrollRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [newMessageFromAdmin, setNewMessageFromAdmin] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);

  const pictureFormats = ["image/png", "image/jpg", "image/jpeg"];
  // check new incoming message and send status after render
  useEffect(() => {
    if (open) setRecivedMessage("");
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [socket, open, recivedMessage]);

  useEffect(() => {
    loadMessage();
  }, [user, newMessageFromAdmin]);

  const loadMessage = async () => {
    const data = await getMessages(user?._id);
    setMessages(data?.messages);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(adminSocket, "admin socket...");
  useEffect(() => {
    socket?.on("recieve_message_user", (data) => {
      setNewMessageFromAdmin([...newMessageFromAdmin, data]);
      if (data) setNewMessageRecived(true);
      console.log(
        newMessageRecived,
        "new recived message 47 - ChatboxClient.jsx"
      );
    });
  }, [socket]);

  console.log(newMessageFromAdmin);
  console.log(selectedFile, "selected file");
  const sendMessage = async (e) => {
    e.preventDefault();
    setNewMessage("");

    if (selectedFile) {
      setUploading(true);
      const { success, message, file } = await uploadFileToCloud(selectedFile);
      setUploading(false);
      // if error in uploading file
      if (!success) return alert(message);

      // send file link as message
      await sendTextMessage(file, selectedFile?.type, selectedFile.name);
      setSelectedFile("");
    } else {
      // send text message
      await sendTextMessage(newMessage, "text");
    }

    // sending current conversation to top
    await addConversation(user?._id);

    // send message wih socket
    socket?.emit("send_message_to_admin", {
      message: newMessage,
      from: user?._id,
      to: adminSocket,
    });
  };

  // send text message
  const sendTextMessage = async (message, type, fileName) => {
    const data = await sendMessageToServer(
      message,
      user?._id,
      type,
      fileName,
      "admin"
    );
    if (!data?.success) return toast.error(data?.message);
    setMessages([...messages, data?.message]);
  };
  return (
    <div>
      <div className="chat__app-box">
        {messages?.map((message) => {
          return (
            <div
              ref={scrollRef}
              className={`${
                message.from === user._id ? "chat-sent" : "chat-rec"
              }`}
            >
              {message?.messageType !== "text" ? (
                <p className={"message__with-attachment"}>
                  <AttachFileIcon />
                  <a target={"_blank"} href={message?.text}>
                    {truncateStr(message?.fileName, 10, 10, 25)}
                  </a>
                </p>
              ) : (
                <p>{message?.text}</p>
              )}
            </div>
          );
        })}
      </div>
      <div>
        <form className="chatbox__bottom" action="" onSubmit={sendMessage}>
          {uploading && (
            <div className="uploading__spinner-main">
              <CircularProgress size={20} />
              <p className="title">Uploading Your File</p>
            </div>
          )}
          {selectedFile && (
            <div className={"selected__file-name"}>
              <p className={"title"}>{selectedFile?.name.slice(0, 15)}</p>
              <FaTimesCircle onClick={() => setSelectedFile("")} />
            </div>
          )}

          <div className="chat__inputs">
            <input
              // onClick={() => setNewMessageRecived(false)}
              type="text"
              name="message"
              value={newMessage}
              id=""
              className="message"
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
            />
            <label for="upload" className="upload">
              <AttachFileIcon />
              <input
                type="file"
                id="upload"
                className="fileupload"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </label>
            <SendIcon className="sendIcon" onClick={sendMessage} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBoxClient;
