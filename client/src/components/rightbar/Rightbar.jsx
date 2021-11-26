import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/online";

export function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={PF+"gift.png"} alt="" />
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
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single": user.relationship === 2 ? "Married": "-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User frineds</h4>
        <div className="rightbarFollowings">
          <div className="righbarFollowing">
            <img src="/assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingFriendName">John Cena</span>
          </div>
          <div className="righbarFollowing">
            <img src="/assets/person/2.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingFriendName">John Cena</span>
          </div>
          <div className="righbarFollowing">
            <img src="/assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingFriendName">John Cena</span>
          </div>
          <div className="righbarFollowing">
            <img src="/assets/person/4.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingFriendName">John Cena</span>
          </div>
          <div className="righbarFollowing">
            <img src="/assets/person/5.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingFriendName">John Cena</span>
          </div>
          <div className="righbarFollowing">
            <img src="/assets/person/6.jpeg" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingFriendName">John Cena</span>
          </div>
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
