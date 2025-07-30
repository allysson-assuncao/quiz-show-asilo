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

export const quiz = axios.create({
    baseURL: `http://localhost:${port}/app/quiz`,
});

export const result = axios.create({
    baseURL: `http://localhost:${port}/app/result`,
});

export const report = axios.create({
    baseURL: `http://localhost:${port}/app/report`,
});
