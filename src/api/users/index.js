import Http from '../httpUtils';

export const getUsers = () => {
    return Http().get('/users')
        .then(response => response.data);
};