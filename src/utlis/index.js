export const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9); // Generate a random string
};

export const formatLocalDate = (date) => {
  const localDate = date ? new Date(date) : new Date();
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  return localDate.toISOString().split("T")[0];
};
