import axios from "axios";

export const ApisAxios = axios.create(({
    baseURL: "http://localhost:3000/",
}))