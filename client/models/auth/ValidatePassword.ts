export const ValidatePassword = (pw: string): boolean => {
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,18}$/;
  return regex.test(pw);
};
