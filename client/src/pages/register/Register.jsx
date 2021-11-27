import axios from "axios";
import { useRef, useContext } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordagain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordagain.current.value !== password.current.value) {
      passwordagain.current.setCustomValidity("Password don`t match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Meta</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Meta.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength={6}
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordagain}
              className="loginInput"
              type="password"
              minLength={6}
            />
            <button className="loginButton">Sign Up</button>
            <Link to="/login" style={{textDecoration: "none"}}>
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
