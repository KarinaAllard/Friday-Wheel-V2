import axios from "axios";

export const api = axios.create({
    baseURL: "https://friday-wheel-v2.vercel.app/api",
    headers: {
        "Content-Type": "application/json",
    }
});