import React from "react";
import { format } from "timeago.js"
import "./messege.css";
export default function Message( {message, own }) {
  return (
    <div className={own ? "message own": "message"}>
      <div className="messageTop">
        <img
          src="https://st1.zoom.us/static/5.2.3280/image/new/home/meetings.png"
          alt="photo"
          className="messageImg"
        />
        <p className="messageText">
          {message.text}
        </p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
