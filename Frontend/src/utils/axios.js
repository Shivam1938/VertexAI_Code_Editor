import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_AUTH_SERVICE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include credentials (cookies) in requests
});

