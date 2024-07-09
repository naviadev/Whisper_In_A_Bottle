export const ValidateId = (id: string): boolean => {
  const regex = /^[a-zA-Zㄱ-힣0-9.]{2,12}$/.test(id);
  return regex;
};
