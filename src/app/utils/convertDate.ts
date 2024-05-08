export const convertDate = (date: Date) => {
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};
