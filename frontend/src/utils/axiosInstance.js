import axios from "axios";
const backendUrl = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseUrl: backendUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    accessToken ? (config.headers.Authorization = `Bearer ${accessToken}`) : "";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
