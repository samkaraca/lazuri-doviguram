import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
    baseURL: "/api",

});

export const apiAdmin = axios.create({
    baseURL: "/api/admin",
});

// Add a response interceptor
apiAdmin.interceptors.response.use(
    function (response) {
        if (response.data && response.data.status === "error") {
            toast.error(response.data.message);
        }
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger

    }
);