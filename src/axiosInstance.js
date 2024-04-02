import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? token : null;
};

const instance = axios.create({
  baseURL: "https://treandytreasure.onrender.com",
  // baseURL: "http://127.0.0.1:5000",

  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

export default instance;
