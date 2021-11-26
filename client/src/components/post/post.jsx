import { useState, useEffect } from "react";
import axios from "axios";
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { format } from "timeago.js";
import { Link } from 'react-router-dom';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  const [ user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userdId=s${post.userId}`);
      setUser(res.data)
    }
    setUser(fetchUser);
  }, [post.userId]);
  const handleClick = () => {
    setLike(isLiked ? like + 1 : like - 1);
    setIsLiked(!isLiked)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`} style={{textDecoration: "none"}}>
              <img
              src={user.profilePicture || PF+"person/noAvatar.png"}
              className="postProfileImg"
              alt=""
            />
            </Link>
            
            <span className="postUserName">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF+post.img} className="postImg" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="/assets/like.png" onClick={handleClick} alt="" />
            <img className="likeIcon" src="/assets/heart.png" onClick={handleClick} alt="" />
            <span className="postlikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
