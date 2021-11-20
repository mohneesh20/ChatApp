import api from "../../backApi";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      alert("PASSWORDS DO NOT MATCH");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await api.post("/auth/register",user);
        await history.push("/login");
      } catch (err) {
        console.log(err);
      }
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
              placeholder="Username"
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              ref={password}
              className="loginInput"
              type="text"
            />
            <input
              placeholder="Password Again"
              ref={passwordAgain}
              className="loginInput"
              type="text"
            />
            <button className="loginButton" onClick={handleClick}>
              R E G I S T E R
            </button>
            <button className="loginRegisterButton" onClick={()=>history.push('/login')}>L O G I N</button>
          </div>
        </div>
      </div>
    </div>
  );
}