import axios from "axios";

// editar somente aqui
const baseAPI = 'localhost:8021/'

const api = axios.create({
    baseURL: `http://${baseAPI}`
})

export const api2 = `http://${baseAPI}`


export default api;
