import axios from "axios";

export const api = axios.create({
    baseURL: "/api",

});

export const apiAdmin = axios.create({
    baseURL: "/api/admin",
});