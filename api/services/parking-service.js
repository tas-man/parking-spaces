const db = require('../utils/db-connector');
const chalk = require('chalk');
const hslRequest = require('../utils/axios-conf');
const helpers = require('../utils/parking-helpers');

const ParkingFacility = db.ParkingFacility;
const parkingFacilityCache = [];
const PREDICTION_TIME_30_MIN = 30;
const PREDICTION_TIME_60_MIN = 60;
const PREDICTION_TIME_90_MIN = 90;

const findInCache = facilityId => {
  if (parkingFacilityCache[facilityId]) {
    const lastTimeStamp = parkingFacilityCache[facilityId].currentStatus.timestamp;
    if (!helpers.dataIsCurrent(lastTimeStamp)) return null;
  }
  return parkingFacilityCache[facilityId];
};

const updateCache = parkingFacility => {
  parkingFacilityCache[parkingFacility.facilityId] = parkingFacility;
  console.log(`Updated cache: ${parkingFacility.facilityName}`);
};

const storeInDB = async parkingFacility => {
  const existingParkingFacility = await ParkingFacility.findOne({
    facilityId: parkingFacility.facilityId,
  });
  if (existingParkingFacility) {
    existingParkingFacility.currentStatus = parkingFacility.currentStatus;
    existingParkingFacility.prediction30min = parkingFacility.prediction30min;
    existingParkingFacility.prediction60min = parkingFacility.prediction60min;
    existingParkingFacility.prediction90min = parkingFacility.prediction90min;
    await existingParkingFacility.save();
    console.log(`Updated database: ${parkingFacility.facilityName}`);
  } else {
    await parkingFacility.save();
    console.log(`Added new facility to database: ${parkingFacility.facilityName}`);
  }
};

const getParkingSpace = async params => {
  helpers.printKeysOfArray(parkingFacilityCache, 'Cached facilities: ');
  const cachedParkingFacility = findInCache(params.facilityId);
  if (cachedParkingFacility) {
    console.log(chalk.cyan('Parking data read from cache'));
    return cachedParkingFacility;
  } else {
    const parkingFacility = await ParkingFacility.findOne({ facilityId: params.facilityId });
    if (
      parkingFacility && helpers.dataIsCurrent(parkingFacility.currentStatus.timestamp)
    ) {
      console.log(chalk.yellow('Parking data read from database'));
      updateCache(parkingFacility);
      return parkingFacility;
    } else {
      console.log(chalk.red('Fetching parking data from HSL API'));
      try {
        const hslRes1 = await hslRequest.getFacilityUtilization(params.facilityId);
        if(!hslRes1.data[0]) throw new Error('Invalid response format');

        const parkingFacility = new ParkingFacility({
          facilityId: hslRes1.data[0].facilityId,
          currentStatus: hslRes1.data[0],
        });

        const hslRes2 = await hslRequest.getFacilityPrediction(params.facilityId, PREDICTION_TIME_30_MIN);
        parkingFacility.prediction30min = hslRes2.data[0];

        const hslRes3 = await hslRequest.getFacilityPrediction(params.facilityId, PREDICTION_TIME_60_MIN);
        parkingFacility.prediction60min = hslRes3.data[0];

        const hslRes4 = await hslRequest.getFacilityPrediction(params.facilityId, PREDICTION_TIME_90_MIN);
        parkingFacility.prediction90min = hslRes4.data[0];

        const hslRes5 = await hslRequest.getFacilityDetails(params.facilityId);
        parkingFacility.facilityName = hslRes5.data.name.en;

        updateCache(parkingFacility);
        await storeInDB(parkingFacility);
        return parkingFacility;
      } catch (err) {
        console.log(err.message);
        throw err;
      }
    }
  }
};

module.exports = {
  getParkingSpace,
};
