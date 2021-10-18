import { useState } from "react";
import { useHistory } from "react-router";
import "./register.css";
const Register = (props) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setErrorMessage("Passwords do not match");
      setPassword("");
      setConfirmPass("");
    }
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/users/register",
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
    console.log(userName);
    console.log(password);
    const info = await response.json();
    if (info.error) {
      setErrorMessage(info.message);
      return errorMessage;
    }
    localStorage.setItem("token", info.token);
    props.setToken(info.token);
    history.push("/");
  };
  return (
    <>
      <form onSubmit={handleSubmit} class="registration">
        <input
          onChange={(e) => setUsername(e.target.value)}
          minLength={4}
          value={userName}
          placeholder="Enter Username..."
          type="text"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          minLength={4}
          value={password}
          placeholder="Enter Password..."
          type="password"
          required
        />
        <input
          onChange={(e) => setConfirmPass(e.target.value)}
          minLength={4}
          type="password"
          placeholder="Confirm Password..."
          value={confirmPass}
          required
        />
        <button>Register</button>
      </form>
      <p>{errorMessage}</p>
    </>
  );
};
export default Register;
