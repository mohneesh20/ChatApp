import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching,dispatch } = useContext(AuthContext);
  const history=useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    try{
      loginCall(
        { email: email.current.value, password: password.current.value },dispatch
      );
    }
    catch(err){
      console.log(err);
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">CONNECT</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="text"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" onClick={handleClick}disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "LOG IN"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" onClick={()=>history.push('/register')}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "CREATE A NEW ACCOUNT"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}