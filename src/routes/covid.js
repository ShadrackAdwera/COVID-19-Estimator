
const express = require('express');

const mongoose = require('mongoose');

const fs = require('fs');

const objectToXml = require('object-to-xml');

const estimator = require('../estimator');

const router = express.Router();

const Statistics = require('../models/statistics');

router.post('', (req, res) => {
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
  stats.save().then().catch((err) => {
    res.status(500).json({
      error: err
    });
  });
  res.status(201).json({
    information: estimator(stats)
  });
});

router.post('/json', (req, res) => {
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
  stats.save().then().catch((err) => {
    res.status(500).json({
      error: err
    });
  });
  res.status(201).json({
    information: estimator(stats)
  });
});

router.post('/xml', (req, res, next) => {
  const {
    name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation
  } = req.body.region;

  const {
    periodType, timeToElapse, reportedCases, population, totalHospitalBeds
  } = req.body;
  const stats = new Statistics({
    region: {
      name,
      avgAge,
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  });
  const estimated = estimator(stats);
  const { data } = estimated;
  const { region } = data;
  const { impact } = estimated;
  const { severeImpact } = estimated;
  const obj = {
    '?xml version="1.0" encoding="UTF-8"?': null,
    data: {
      '@': {
        type: 'xml'
      },
      '#': {
        region: {
          '@': {
            type: 'xml'
          },
          '#': {
            name: region.name,
            avgAge: region.avgAge,
            avgDailyIncomeInUSD: region.avgDailyIncomeInUSD,
            avgDailyIncomePopulation: region.avgDailyIncomePopulation
          }

        },
        periodType: data.periodType,
        timeToElapse: data.timeToElapse,
        reportedCases: data.reportedCases,
        population: data.population,
        totalHospitalBeds: data.totalHospitalBeds
      }
    },
    impact: {
      '@': {
        type: 'xml'
      },
      '#': {
        currentlyInfected: impact.currentlyInfected,
        infectionsByRequestedTime: impact.infectionsByRequestedTime,
        severeCasesByRequestedTime: impact.severeCasesByRequestedTime,
        hospitalBedsByRequestedTime: impact.hospitalBedsByRequestedTime,
        casesForICUByRequestedTime: impact.casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime: impact.casesForVentilatorsByRequestedTime,
        dollarsInFlight: impact.dollarsInFlight
      }

    },
    severeImpact: {
      '@': {
        type: 'xml'
      },
      '#': {
        currentlyInfected: severeImpact.currentlyInfected,
        infectionsByRequestedTime: severeImpact.infectionsByRequestedTime,
        severeCasesByRequestedTime: severeImpact.severeCasesByRequestedTime,
        hospitalBedsByRequestedTime: severeImpact.hospitalBedsByRequestedTime,
        casesForICUByRequestedTime: severeImpact.casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime: severeImpact.casesForVentilatorsByRequestedTime,
        dollarsInFlight: severeImpact.dollarsInFlight
      }

    }
  };
  res.end(objectToXml(obj));
  next();
});

router.get('/logs', (req, res, next) => {
  res.setHeader('content-type', 'text/plain');
  const pathUrl = process.cwd();
  const dataRead = fs.readFileSync(`${pathUrl}/access.log`, 'utf8');
  const newSpace = dataRead.split('\n');

  newSpace.splice(-1, 1);

  const display = newSpace.join('\n');
  res.end(display);
  next();
});

module.exports = router;
