import axios from 'axios'


const URL = "https://sreedev.live"
const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_API;

export const makeApiCall = async (endpoint: string, method: string, data?: any) => {
        try {
                const response = await axios({
                        method,
                        url: `${URL}${endpoint}`,
                        data,
                });
                return response;
        } catch (error: any) {
                throw error.response.data;
        }
};

export const cloudinaryUpload = axios.create({ baseURL: CLOUDINARY_UPLOAD_URL });
