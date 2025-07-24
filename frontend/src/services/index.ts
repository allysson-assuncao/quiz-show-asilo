import axios from "axios";

/*const port = "8080";*/

const port = "8081";

export const auth = axios.create({
    baseURL: `http://localhost:${port}/app/auth`,
});

export const user = axios.create({
    baseURL: `http://localhost:${port}/app/user`,
});

export const question = axios.create({
    baseURL: `http://localhost:${port}/app/question`,
});
