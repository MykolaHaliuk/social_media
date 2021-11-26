import { useRef, useContext } from "react";
import "./login.css";
import { loginCall } from "../../appCalls";
import { AuthContext } from "../../contex/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch, error } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              minLength={6}
              className="loginInput"
              required
              ref={password}
            />
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="25px" />
              ) : (
                "Login"
              )}
            </button>
            <span className="loginForgot">Forgon Password?</span>
            <button className="loginRegisterButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="25px" />
              ) : (
                " Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
