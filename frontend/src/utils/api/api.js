import axios from "axios";
import { CurrentToken } from "../helper/TokenService";

export const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        Accept: "application/json",
        Authorization:`Bearer ${CurrentToken.get()}` 
    }
})