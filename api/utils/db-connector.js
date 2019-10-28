const mongoose = require('mongoose');
const chalk = require('chalk');
const conf = require('../constants/config.json');
const parkingFacilitySchema = require('../models/parking-facility-model');

mongoose.connect(conf.MONGODB_URI, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', err => console.log(chalk.red(`MongoDB connection could not be established: ${err.message}`)));
mongoose.connection.once('open', () => console.log(chalk.green('MongoDB connection established successfully.')));

module.exports = {
  ParkingFacility: parkingFacilitySchema,
};