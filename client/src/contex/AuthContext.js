import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITAL_STATE = {
  // user: {
  //   _id: "61a146193df0ed201d2d76e2",
  //   username: "Mykola",
  //   email: "qwe@qwe.com",
  //   profilePicture: "",
  //   coverPicture: "",
  //   followers: [],
  //   followins: [],
  //   isAdmin: false,
  //   createdAt: "2021-11-26T20:39:53.279+00:00",
  //   updatedAt: "2021-11-27T12:49:46.189+00:00",
  // },
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITAL_STATE);

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, INITAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
