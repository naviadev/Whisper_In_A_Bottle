import React from "react";

// import Socket from "./components/socket";
import RegisterForm from "./components/auth/registerForm";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Letter Sending App</h1>
      {/* <Socket /> */}
      <RegisterForm />
    </div>
  );
};

export default HomePage;
