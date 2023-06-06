import dotEnv from 'dotenv'

dotEnv.config()

export const serverConfig = () => {
    return {
        name: "DocHub",
        port : process.env.PORT || 8085,
        baseUrl : '/payment',
    }
}