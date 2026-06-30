import axios from "axios";

const API = axios.create({
  baseURL: "https://vision-gate-rho.vercel.app",
});

export default API;