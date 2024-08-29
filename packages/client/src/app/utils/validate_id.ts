export const ValidateId = (id: string): boolean => {
  const regex = /^[a-zA-Z0-9]{5,12}$/;
  return regex.test(id);
};
