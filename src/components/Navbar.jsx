// import React from 'react'
// import '../App'
import { Link } from "react-router-dom";
import "./Navbar.css";

import { useNavigate } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

function Navbar() {
  const { user, logout } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <header>
      <div style={{display: 'flex', alignItems: 'center'}}>
      <h1>
        <i className="fa-solid fa-book"></i>
      </h1>
        <h3 style={{marginLeft: '10px'}}>Libro</h3>
      </div>
      <div class="dropdown">
        <a
          className="btn btn-secondary"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{
            backgroundColor: "white",
            border: "none",
            color: "black",
            borderRadius: "50px",
          }}
        >
          <i class="fa-regular fa-user"></i>
        </a>

        <ul className="dropdown-menu" style={{ color: "black" }}>
          <div style={{ marginLeft: "20px" }}>
            <div>
              <p
                style={{
                  width: "90%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                Account: <span>{user && user.email}</span>
              </p>
            </div>
            <Link
              to="/books"
              className="borrow"
              style={{ textDecoration: "none", color: "black" }}
            >
              Books
            </Link>
            <br />
            <Link
              to="/borrow"
              className="borrow"
              style={{ textDecoration: "none", color: "black" }}
            >
              Borrowed Books
            </Link>{" "}
            <br />
            <Link
              to="/borrow"
              className="borrow"
              style={{ textDecoration: "none", color: "black" }}
              onClick={handleLogout}
            >
              Logout
            </Link>
          </div>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
