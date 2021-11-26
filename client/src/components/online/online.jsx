import "./online.css";

export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend" key={user.id}>
      <div className="rightbarProfileImgContainer">
        <img
          className="rightBarProfileImg"
          src={PF+user.profilePicture}
          alt=""
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightBarUserName">{user.username}</span>
    </li>
  );
}
