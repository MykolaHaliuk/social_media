import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
    console.log(userCredential, "userCredential")
    dispatch({type: "LOGIN_START"});
    try {
        const res = await axios.post("/auth/login", userCredential);
        console.log(res, " resrsf");
        dispatch({ type: "LOGIN_SECCESS", payload: res.data});
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err});
    }
}