import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Post from "../post/post";
import Share from "../shareComponent/share";
import { AuthContext } from "../../contex/AuthContext";
import "./feed.css";

export function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);
      setPosts(res.data.sort((p1,p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    };
    fetchPosts();
  }, [user, username]);
  return (
    <div className="feed">
      <div className="feedWrapper">
       { (!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post post={p} id={p.id} key={p.id} />
        ))}
      </div>
    </div>
  );
}
export default Feed;
