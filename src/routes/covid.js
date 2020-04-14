/* eslint-disable no-unused-vars */

const express = require('express');

const mongoose = require('mongoose');

const fs = require('fs');

const logger = require('../logger');

const estimator = require('../estimator');

const router = express.Router();

const Statistics = require('../models/statistics');

router.post('', (req, res, next) => {
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
    console.log(result);
  }).catch((err) => {
    res.status(500).json({
      error: err
    });
  });
  res.status(201).json({
    information: estimator(stats)
  });
});

router.post('/json', (req, res, next) => {
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
    console.log(result);
  }).catch((err) => {
    res.status(500).json({
      error: err
    });
  });
  res.send(estimator(stats));
  res.status(201).json({
    information: estimator(stats)
  });
});

router.post('/xml', (req, res, next) => {
  res.status(201).json({

  });
});

router.get('/logs', (req, res, next) => {
  res.setHeader('content-type', 'text/plain');
  const path = process.cwd();
  const data = fs.readFileSync(`${path}/access.log`, 'utf8');
  const lines = data.split('\n');

  lines.splice(-1, 1);

  const finalData = lines.join('\n');
  res.end(finalData);
  next();
});

module.exports = router;
