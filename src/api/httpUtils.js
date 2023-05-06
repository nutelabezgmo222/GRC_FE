import axios from 'axios';

const REMEMBER_TOKEN_KEY = 'rememberToken';

const getAuth = () => {
    let tokenFromLocalStorage = localStorage.getItem(REMEMBER_TOKEN_KEY);
    return tokenFromLocalStorage || '';
};

const Http = () => axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        responseType: 'json',
        Authorization: getAuth()
    },
});

export default Http;