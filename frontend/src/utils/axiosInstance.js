import axios from "axios";
const backendUrl = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: backendUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    accessToken
      ? (config.headers.Authorization = `Bearer ${accessToken}`)
      : console.log("No access token");
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
