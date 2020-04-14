const mongoose = require('mongoose');

const regionSchema = mongoose.Schema({
  name: String,
  avgAge: Number,
  avgDailyIncomeInUSD: Number,
  avgDailyIncomePopulation: Number
});

const statsSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  region: regionSchema,
  periodType: String,
  timeToElapse: Number,
  reportedCases: Number,
  population: Number,
  totalHospitalBeds: Number
});
