// get .env
export const env = (key, fallback = null) => {
    return import.meta.env[key] ?? fallback;
};

// token service
export const CurrentToken = {
    get : () => localStorage.getItem('auth_token'),
    set : (token) => localStorage.setItem('auth_token', token),
    remove : () => localStorage.removeItem('auth_token')
}

// role service
export const getRole =  {
    get : () => localStorage.getItem('role'),
    set : (role) => localStorage.setItem('role', role),
    remove : () => localStorage.removeItem('role')
}

// api helper
import axios from "axios";

export const api = axios.create({
    baseURL: env('VITE_API_URL'),
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

let apiCalled
export const throttle = ( fn, time) => {
    if (apiCalled) return;
    apiCalled = true
    fn()
    setTimeout(function() {
        apiCalled = false
    }, time);
}