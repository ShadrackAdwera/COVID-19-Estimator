/* eslint-disable no-unused-vars */
const express = require('express');

const estimator = require('../estimator');

const router = express.Router();

router.post('/', (req, res, next) => {
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

router.post('/json', (req, res, next) => {
  res.status(201).json({

  });
});

router.post('/xml', (req, res, next) => {
  res.status(201).json({

  });
});

module.exports = router;
