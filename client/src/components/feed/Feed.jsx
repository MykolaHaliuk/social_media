import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/post";
import Share from "../shareComponent/share";
import "./feed.css";

export function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username ? await axios.get("posts/profile/"+ username) : await axios.get("posts/timeline/617b045a79689d71cf910631");
      setPosts(res.data);
    }
    fetchPosts();
  }, [username])
  return (
    <div className="feed">
      <div className="feedWrapper"> 
        <Share />
        {posts.map((p) => (
          <Post post={p} id={p.id} key={p.id} />
        ))}
      </div>
    </div>
  );
}
export default Feed;
