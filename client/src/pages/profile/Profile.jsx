import { useState, useEffect } from "react";
import axios from "axios";

import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router";

export default function Profile() {
  const [user, setUser] = useState({});
  const params = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${params.username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [params.username]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  if (!user.username) {
    
    return null;
  }
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicrture
                    ? PF + user.profilePicrture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="profileUserImg"
              />
            </div>
          </div>
          <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
            <h4 className="profileInfoDesc">{user.description}</h4>
          </div>
          <div className="profileRightBottom">
            <Feed username={params?.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
