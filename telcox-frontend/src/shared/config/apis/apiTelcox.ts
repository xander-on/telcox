import axios from "axios";
import { apis } from "../../constants/apis";

const apiTelcox = axios.create({
  baseURL: apis.telcox,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // "Authorization": "Bearer token" 
  },
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


export default apiTelcox;
