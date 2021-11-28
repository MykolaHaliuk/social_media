import axios from "axios";
import React, { useState, useEffect } from "react";
import "./chatOnline.css";
export default function ChatOnline({
  onlineUsers,
  currentUserId,
  setCurrentChat,
}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentUserId);
      setFriends(res.data);
    };
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [onlineUsers, friends]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/converstation/find/${currentUserId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div
          className="charOnlineFriend"
          key={o._id}
          onClick={() => handleClick(o)}
        >
          <div className="chatOnlineImgContainer">
            <div className="chatOnlineImgOnline">
              <img
                src={
                  o.profilePicrture
                    ? PF + o.profilePicrture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="chatOnlineImg"
              />
              <div className="chatOnlineBadge"></div>
            </div>
          </div>
          <div className="chatOnlineName">{o.username}</div>
        </div>
      ))}
    </div>
  );
}
