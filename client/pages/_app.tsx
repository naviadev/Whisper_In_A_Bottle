import React, { useState } from "react";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      console.log("login패치보냄");
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        {
          id: "test",
          password: "password",
        },
        { withCredentials: true },
      );
      localStorage.setItem("access_token", response.data.access_token);
      setMessage("Logged in successfully");
    } catch (error) {
      setMessage("Login failed");
    }
  };

  const validateToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/validate-token",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data) {
        setMessage("Token is valid");
      } else {
        setMessage("Token is invalid");
      }
    } catch (error) {
      setMessage("Token validation failed");
    }
  };

  return (
    <div className="App">
      <button onClick={login}>Login</button>
      <button onClick={validateToken} disabled={!token}>
        Validate Token
      </button>
      <p>{message}</p>
    </div>
  );
}

export default App;
