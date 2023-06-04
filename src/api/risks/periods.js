import Http from '../httpUtils';

export const getRiskPeriods = () => {
    return Http().get('/risks/periods')
        .then(response => response.data);
};

export const getCurrentPeriod = () => {
  return Http().get('/risks/periods/current')
      .then(response => response.data);
};

export const createRiskPeriod = (data) => {
    return Http().post('/risks/periods', data)
        .then(response => response.data);
};