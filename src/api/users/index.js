import Http from '../httpUtils';

export const getUsers = () => {
    return Http().get('/users')
        .then(response => response.data);
};

export const createUser= (data) => {
    return Http().post('/user', data)
        .then(response => response.data);
};

export const updateUser = (id, propsToUpdate) => {
    return Http().patch('/user/' + id, propsToUpdate)
        .then(response => response.data);
};