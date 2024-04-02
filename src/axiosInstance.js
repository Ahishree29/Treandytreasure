import axios from "axios";

const instance = axios.create({
  baseURL: "https://treandytreasure.onrender.com",
  // baseURL: "http://127.0.0.1:5000",

  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    console.log("Interceptor called");
    const token = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).token
      : null;
    if (token) {
      console.log("Token:", token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
