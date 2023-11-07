import axios from 'axios'

// conexão com API
export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "fa2f0f4812f8320ad2ad533c17307462",
        language: "pt-BR",
        includes_adult: false,
    }
})