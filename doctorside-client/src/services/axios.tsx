import axios from 'axios'

const URL = "https://sreedev.live"


const axiosInstance = axios.create({
  baseURL: URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 

    if (token && config.url !== '/auth/doctor/login') {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

export const makeApiCall = async (endpoint: string, method: string, data?: any) => {
  try {
    const response = await axiosInstance({
      method,
      url: `${URL}${endpoint}`,
      data,
    });
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};
const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_API;

export const cloudinaryUpload = axios.create({ baseURL: CLOUDINARY_UPLOAD_URL });
