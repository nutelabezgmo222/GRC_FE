import Http from '../httpUtils';

export function register(user) {
    return Http().post('/registration', user)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}

export function login(loginData) {
    return Http().post('/login', loginData)
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}

export function logout() {
    return Http().get('/logout')
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}

export function loginByToken(token) {
    return Http().post('/tokenLogin', { remember_token: token })
        .then(response => response.data)
        .catch(err => {
            throw err;
        });
}
  

