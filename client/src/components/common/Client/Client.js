import axios from "axios";


const client = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL: "https://leaf-world-backend.vercel.app",
});

export default client;
