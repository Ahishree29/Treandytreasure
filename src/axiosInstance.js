import axios from "axios";

const instance = axios.create({
  baseURL: "https://treandytreasure.onrender.com",
});

export default instance;
