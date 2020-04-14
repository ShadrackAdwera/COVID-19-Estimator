const mongoose = require('mongoose');

const regionSchema = mongoose.Schema({
  _id: 0,
  name: String,
  avgAge: Number,
  avgDailyIncomeInUSD: Number,
  avgDailyIncomePopulation: Number
});

const statsSchema = mongoose.Schema({
  _id: 0,
  region: regionSchema,
  periodType: String,
  timeToElapse: Number,
  reportedCases: Number,
  population: Number,
  totalHospitalBeds: Number
});

module.exports = mongoose.model('Statistics', statsSchema);
