// function to verify via regex if an email is valid
export const helper = (email) => {
  const regex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  return regex.test(email);
};

// function to get the initials of a name
export const getInitials = (name) => {
  let initials = "";
  const words = name.split(" ");
  for (let i = 0; i < words.length; i++) {
    initials += words[i][0].toUpperCase();
  }
  return initials;
};
