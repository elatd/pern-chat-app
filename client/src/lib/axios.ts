import axios from "axios";

// for development
// const AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL + `/api`,
//   withCredentials: true,
// });

// for production
const AxiosInstance = axios.create({
  baseURL: `/api`,
  withCredentials: true,
});

export default AxiosInstance;
