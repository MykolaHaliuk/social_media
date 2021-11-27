import "./rightbar.css";

import { useEffect, useState, useContext } from "react";
import { Users } from "../../dummyData";
import axios from "axios";
import Online from "../online/online";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contex/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispath } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.followins.includes(user?._id));
  }, [currentUser, user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (e) {
        console.log();
      }
    };
    getFriends();
  }, [user?._id]);

  const handleClick = async () => {
    try {
      if (!followed) {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispath({type: "FOLLOW", payload: user._id})
      } else {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispath({type: "UNFOLLOW", payload: user._id})
      }
    } catch (e) {
      console.log(e);
    }
    setFollowed(!followed);
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF + "gift.png"} alt="" />
          <span className="bithdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img src={`${PF}ad.png`} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rigthbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User Information Title</h4>
        <div className="rightbarInfo">
          <div className="rightBarInfoItem">
            <span className="rightbarInfoKey">City</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightBarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User frineds</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
              key={friend._id}
            >
              <div className="righbarFollowing">
                <img
                  src={
                    friend.profilePicrture
                      ? PF + friend.profilePicrture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingFriendName">
                  {friend.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export default Rightbar;
