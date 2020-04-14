/* eslint-disable no-unused-vars */

const express = require('express');

const mongoose = require('mongoose');

const estimator = require('../estimator');

const router = express.Router();

const Statistics = require('../models/statistics');

router.post('/', (req, res, next) => {
  const stats = new Statistics({
    _id: new mongoose.Types.ObjectId(),
    region: {
      name: req.body.region.name,
      avgAge: req.body.region.avgAge,
      avgDailyIncomeInUSD: req.body.region.avgDailyIncomeInUSD,
      avgDailyIncomePopulation: req.body.region.avgDailyIncomePopulation
    },
    periodType: req.body.periodType,
    timeToElapse: req.body.timeToElapse,
    reportedCases: req.body.reportedCases,
    population: req.body.population,
    totalHospitalBeds: req.body.totalHospitalBeds
  });
  stats.save().then((result) => {
    res.status(201).json({
      information: estimator(stats)
    });
  }).catch((err) => {
    res.status(500).json({
      error: err
    });
  });
});

router.post('/json', (req, res, next) => {
  const info = {
    region: {
      name: req.body.region.name,
      avgAge: req.body.region.avgAge,
      avgDailyIncomeInUSD: req.body.region.avgDailyIncomeInUSD,
      avgDailyIncomePopulation: req.body.region.avgDailyIncomePopulation
    },
    periodType: req.body.periodType,
    timeToElapse: req.body.timeToElapse,
    reportedCases: req.body.reportedCases,
    population: req.body.population,
    totalHospitalBeds: req.body.totalHospitalBeds

  };
  res.status(201).json({
    information: estimator(info)
  });
});

router.post('/xml', (req, res, next) => {
  res.status(201).json({

  });
});

module.exports = router;
