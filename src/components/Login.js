import { useState } from "react";
import { useHistory } from "react-router";
import "./Login.css";
const myStyle = {
  textAlign: "center",
};

const Login = (props) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      }
    );
    const info = await response.json();
    if (info.error) {
      setErrorMessage(info.message);
    }
    localStorage.setItem("token", info.token);
    props.setUser(info.user);
    history.push("/");
  };
  return (
    <>
      <form onSubmit={handleSubmit} class="Login" style={myStyle}>
        <input
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username..."
          type="text"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password..."
          type="password"
        />
        <button>Login</button>
      </form>
      <p>{errorMessage}</p>
    </>
  );
};
export default Login;
