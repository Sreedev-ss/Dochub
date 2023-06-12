import axios from 'axios'

const URL = "http://localhost:3000"

const axiosInstance = axios.create({
  baseURL: URL,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve the token from your storage (e.g., localStorage)

    if (token && config.url !== '/auth/patient/signup' && config.url !== '/auth/patient/login') {
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
