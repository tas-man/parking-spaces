const express = require('express');
const parkingService = require('../services/parking-service');

const parkingspace = (req, res, next) => {
  parkingService.getParkingSpace(req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
};

const router = express.Router();
router.post('/parkingspace', parkingspace);

module.exports = router;
