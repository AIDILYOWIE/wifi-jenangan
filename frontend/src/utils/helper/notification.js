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