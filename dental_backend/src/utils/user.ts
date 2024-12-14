export const generateToken = () => {
  const tokenChar =
    "0123456789";
  let number = "";
  for (let i = 0; i < 6; i++) {
    number += tokenChar.charAt(Math.floor(Math.random() * tokenChar.length));
  }
  console.log({ number });
  return number;
};
