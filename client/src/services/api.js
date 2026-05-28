
import axios from "axios";

const api = axios.create({
  baseURL: "https://puja-backend-g4ri.onrender.com/api"
});

export default api;
