/* eslint-disable no-unused-vars */
const express = require('express');

const app = express();

const morgan = require('morgan');

const bodyParser = require('body-parser');

const covidRoutes = require('./routes/covid');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/on-covid-19', covidRoutes);

// error handling methods
app.use((req, res, next) => {
  const error = new Error('Response not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
