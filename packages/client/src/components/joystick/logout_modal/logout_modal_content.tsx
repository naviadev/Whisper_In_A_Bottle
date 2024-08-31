import { logoutAxios } from "../power_button/service/logout_axios";
export const LogoutModalContent = () => {
  const ani = () => {
    alert("그럼돌아가");
  };

  return (
    <>
      <p>네가 나갈 수 있을거라고 생각해?</p>
      <button onClick={() => logoutAxios}>응</button>
      <button onClick={ani}>아니</button>
    </>
  );
};
