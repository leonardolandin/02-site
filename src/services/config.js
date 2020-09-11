import axios from 'axios'

export const http = axios.create({
    baseURL: "https://localhost:8081",
    headers: {
        'Content-Type': 'application/json'
    }
})