import React from "react";

// import Socket from "./components/socket";
// import RegisterForm from "./components/auth/registerForm";
import LettersPage from "./letterPage";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Letter Sending App</h1>
      <LettersPage />
      {/* <Socket />
      <RegisterForm /> */}
    </div>
  );
};

export default HomePage;
