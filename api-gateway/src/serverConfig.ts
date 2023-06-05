import dotEnv from 'dotenv'

dotEnv.config()

export const serverConfig = () => {
    return {
        name: "Dochub - gateway",
        port : process.env.PORT || 3080,
        baseUrl : '/',
    }
}