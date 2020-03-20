import axios from "axios";

export const userSignup = async user => {
  const { data } = await axios.post("/api/v0/auth/signup", user);

  return data;
};
