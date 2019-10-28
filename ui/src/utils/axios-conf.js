import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/';

const getParkingDataById = (id) => axios({
  url: `${BASE_URL}parkingspace`,
  method: 'POST',
  headers: {
    ContentType: 'application/json',
  },
  data: {
    'facilityId': id,
  }
});

export default getParkingDataById;