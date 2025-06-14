import axios from "axios";
const backendUrl = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseUrl: backendUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
