import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";
import "../components/SignIn.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="container-sm">
      <h2>Sign in to your account</h2>
      <p>
        Don't have an account? <Link to="/signup"> Sign Up </Link>
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            className="filled-basic"
            label="Username"
            variant="filled"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            className="filled-basic"
            label="Password"
            variant="filled"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
