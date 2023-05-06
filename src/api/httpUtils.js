import axios from 'axios';

const headers = {};
const Http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers
});

export default Http;