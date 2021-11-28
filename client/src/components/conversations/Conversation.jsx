import axios from "axios";
import React, { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation, currentUser]);
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user.profilePicrture
                    ? PF + user.profilePicrture
                    : PF + "person/noAvatar.png"}
        alt="test"
      />
      <span className="conversationName">{user.username}</span>
    </div>
  );
}
