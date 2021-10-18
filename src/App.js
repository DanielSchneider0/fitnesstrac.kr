import "./App.css";
import React from "react";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Routines from "./components/Routines";
import MyRoutines from "./components/My_Routines";
import Activities from "./components/Activities";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      //   const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }
      const resp = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/users/me",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await resp.json();
      //   console.log(token, data);
      setUser({ id: data.id, username: data.username, token: token });
    };
    fetchUser();
  }, [token]);
  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
    }
  }, []);
  return (
    <div className="app">
      <div className="Navbar">
        <Navbar
          user={user}
          token={token}
          setToken={setToken}
          setUser={setUser}
        />
      </div>
      <Route exact path="/">
        <Home user={user} />
      </Route>
      <Route exact path="/Activities">
        <Activities token={token} user={user} />
      </Route>
      <Route exact path="/Routines">
        <Routines user={user} token={token} />
      </Route>
      <Route exact path="/My_Routines">
        <MyRoutines
          user={user}
          token={token}
          setToken={setToken}
          setUser={setUser}
        />
      </Route>
      <Route exact path="/Login">
        <Login setToken={setToken} setUser={setUser} />
      </Route>
      <Route
        exact
        path="/Register"
        render={(props) => <Register {...props} setToken={setToken} />}
      ></Route>
    </div>
  );
}

export default App;
