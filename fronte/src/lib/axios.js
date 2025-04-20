import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL:`${import.meta.env.VITE_Api}api`,
    withCredentials: true,
});