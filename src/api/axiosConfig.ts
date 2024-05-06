import Axios from "axios";

//endpoint
const baseUrl = `http://harctto.3bbddns.com:12819/`;

const services = Axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
services.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("token");

  if (accessToken) {
    config.headers!.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default services;
