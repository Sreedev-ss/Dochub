import axios from 'axios'


const URL = "http://localhost:3000"

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
