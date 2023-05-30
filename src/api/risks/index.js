import Http from '../httpUtils';

export const getRisks = () => {
    return Http().get('/risks')
        .then(response => response.data);
};

export const getRisk = (id) => {
    return Http().get('/risk/' + id)
        .then(response => response.data);
};

export const createRisk = (data) => {
    return Http().post('/risk', data)
        .then(response => response.data);
};

export const updateRisk = (id, propsToUpdate) => {
    return Http().patch('/risk/' + id, propsToUpdate)
        .then(response => response.data);
};

export const getRiskAttributes = () => {
    return Http().get('/risk/attributes')
        .then(response => response.data);
};

export const createRiskAttribute = (data) => {
    return Http().post('/risk/attributes', data)
        .then(response => response.data);
};

export const patchRiskAttribute = (id, type, data) => {
    return Http().patch(`/risk/attributes/${id}/${type}`, data)
        .then(response => response.data);
};

export const deleteRiskAttribute = (id, type) => {
    return Http().delete(`/risk/attributes/${id}/${type}`)
        .then(response => response.data);
};