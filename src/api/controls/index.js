import Http from '../httpUtils';

export const getControls = () => {
    return Http().get('/controls')
        .then(response => response.data);
};

export const getControl = (id) => {
    return Http().get('/control/' + id)
        .then(response => response.data);
};

export const createControl = (data) => {
    return Http().post('/control', data)
        .then(response => response.data);
};

export const updateControl = (id, propsToUpdate) => {
    return Http().patch('/control/' + id, propsToUpdate)
        .then(response => response.data);
};