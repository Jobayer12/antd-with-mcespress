import axios from "axios";

export const userSignup = async user => {
  const { data } = await axios.post("/api/v0/auth/signup", user);

  return data;
};

export const userSignIn = async user => {
  const { data } = await axios.post("/api/v0/auth/signin", user);
  localStorage.setItem("token", data.token.token);
  return data;
};

export const userEmailVerify = async user => {
  const { data } = await axios.post("/api/v0/auth/emailVerify", user);
  return data;
};

export const userResetPassword = async user => {
  const { data } = await axios.post("/api/v0/auth/resetPassword", user);
  return data;
};

export const userVerify = async token => {
  const { data } = await axios.get(`/api/v0/auth/verifyEmail/${token}`);
  return data;
};
