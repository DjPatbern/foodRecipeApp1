import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookie, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookie("access_token", "");
    window.localStorage.removeItem("UserId");
    window.localStorage.removeItem("Username");
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create">Create Res</Link>
      
      {cookie.access_token?.length < 1 ? (
        <Link to="/auth">Login</Link>
      ) : (
        <>
        <Link to="/saved">Saved Res</Link>
        <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
