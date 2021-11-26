import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img src={PF+user.profilePicture} alt="img" className="sidebarFriendImg" />
      <span className="sideBarFriedName">{user.username}</span>
    </li>
  );
}
