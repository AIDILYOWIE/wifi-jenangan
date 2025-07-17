// token service
export const CurrentToken = {
    get : () => localStorage.getItem('auth_token'),
    set : (token) => localStorage.setItem('auth_token', token),
    remove : () => localStorage.removeItem('auth_token')
}

// api helper
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        Accept: "application/json",
        Authorization:`Bearer ${CurrentToken.get()}` 
    }
})

// toastify helper
import { toast } from "react-toastify"

export const updateToastToSuccess = (id, message) => {
    toast.update(id, {
        render: message,
        type: "success",
        isLoading: false,
        hideProgressBar : true,
        autoClose: 3000,
        closeOnClick: true
    });
}

export const updateToastToError = (id, message) => {
    toast.update(id, {
        render: message,
        type: "error",
        isLoading: false,
        hideProgressBar : true,
        autoClose: 3000,
        closeOnClick: true
    });
}