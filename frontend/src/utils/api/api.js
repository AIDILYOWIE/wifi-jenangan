import axios from "axios";
import { CurrentToken } from "../helper/TokenService";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        Accept: "application/json",
        Authorization:`Bearer ${CurrentToken.get()}` 
    }
})