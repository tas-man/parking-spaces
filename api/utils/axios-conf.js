const axios = require('axios');
const BASE_URL = 'https://p.hsl.fi/api/v1/facilities/';
const CONTENT_TYPE = 'application/json'

const getFacilityDetails = (facility) => axios({
  url: `${BASE_URL}${facility}`,
  method: 'GET',
  headers: {
    ContentType: CONTENT_TYPE,
  },
});

const getFacilityUtilization = (facility) => axios({
  url: `${BASE_URL}${facility}/utilization`,
  method: 'GET',
  headers: {
    ContentType: CONTENT_TYPE,
  },
});

const getFacilityPrediction = (facility, time) => axios({
  url: `${BASE_URL}${facility}/prediction?`,
  method: 'GET',
  headers: {
    ContentType: CONTENT_TYPE,
  },
  params: {
    after: time
  }
});

module.exports = {
  getFacilityDetails,
  getFacilityUtilization,
  getFacilityPrediction,
};