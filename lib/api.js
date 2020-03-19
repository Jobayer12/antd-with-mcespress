import axios from "axios";

export const userSignup = async user => {
  console.log("USER CLIENT", user);
  const { data } = await axios.post("/api/v0/auth/signup", user);
  console.log(data);
  return data;
};
