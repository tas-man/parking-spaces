const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  facilityId: { type: String, unique: true, required: true },
  facilityName: { type: String },
  currentStatus: { type: Schema.Types.Mixed, required: true },
  prediction30min: { type: Schema.Types.Mixed },
  prediction60min: { type: Schema.Types.Mixed },
  prediction90min: { type: Schema.Types.Mixed },
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ParkingFacility', schema);