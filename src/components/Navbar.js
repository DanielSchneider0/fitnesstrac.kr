import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import "./Navbar.css";
import React from "react";

const Navbar = (props) => {
  const history = useHistory();
  const handleLogout = () => {
    props.setToken(null);
    localStorage.removeItem("token");
    history.push("/");
    props.setUser(null);
  };

  return (
    <div id="Header">
      <Link id="Title" to="/" style={{ textDecoration: "none" }}>
        fitnesstrac.kr
      </Link>
      <div className="Buttons">
        {" "}
        <Link id="Links" to="/">
          Home
        </Link>
        <Link id="Links" to="/Activities">
          Activities
        </Link>
        <Link id="Links" to="/Routines">
          Routines
        </Link>
        {!props.user && (
          <>
            <Link id="Links" to="/Login">
              Login
            </Link>
          </>
        )}
        {!props.user && (
          <>
            <Link id="Links" to="/Register">
              Register
            </Link>
          </>
        )}
        {props.user && (
          <>
            <Link id="Links" to="/My_Routines">
              My Routines
            </Link>
          </>
        )}
        {props.user && (
          <>
            <span id="Links" onClick={handleLogout}>
              Logout
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
