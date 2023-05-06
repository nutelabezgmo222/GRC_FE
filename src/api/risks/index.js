import Http from '../httpUtils';

export const getRisks = () => {
    return Http().get('/risks')
        .then(response => response.data);
};

export const getRisk = (id) => {
    return Http().get('/risk/' + id)
        .then(response => response.data);
};

export const updateRisk = (id, propsToUpdate) => {
    return Http().patch('/risk/' + id, propsToUpdate)
        .then(response => response.data);
};