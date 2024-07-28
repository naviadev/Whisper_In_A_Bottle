const ValidateId = (id: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(id);
};

export default ValidateId;
