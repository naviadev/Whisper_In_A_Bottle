import React from "react";

const registerForm = () => {
  return (
    <div className="register-form">
      <input type="text" placeholder="이름" />
      <input type="email" placeholder="email" />
      <input type="password" placeholder="password" />
      <input type="password" placeholder="passwordCheck" />
      <button type="submit">send</button>
    </div>
  );
};

export default registerForm;
