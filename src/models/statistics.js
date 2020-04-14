const mongoose = require('mongoose');

const regionSchema = mongoose.Schema({
  name: { required: true, type: String },
  avgAge: { required: true, type: Number },
  avgDailyIncomeInUSD: { required: true, type: Number },
  avgDailyIncomePopulation: { required: true, type: Number }
});

const statsSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  region: { required: true, type: regionSchema },
  periodType: { required: true, type: Number },
  timeToElapse: { required: true, type: Number },
  reportedCases: { required: true, type: Number },
  population: { required: true, type: Number },
  totalHospitalBeds: { required: true, type: Number }
});

module.exports = mongoose.model('Statistics', statsSchema);
