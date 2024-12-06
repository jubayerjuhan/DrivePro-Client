import React, { useState } from "react";
import Chat from "../../components/Chat/Chat";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const LiveChat = () => {
  const [showChat, setShowChat] = useState(false);

  // handle show chat click
  const handleShowChat = () => {
    setShowChat(true);
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="sectionPadding">
        <h1>LiveChat</h1>
        {showChat ? (
          <Chat />
        ) : (
          <button onClick={handleShowChat}>Start Chat</button>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LiveChat;
