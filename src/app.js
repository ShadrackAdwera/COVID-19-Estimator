
const express = require('express');

const app = express();

const fs = require('fs');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const covidRoutes = require('./routes/covid');

mongoose.connect('mongodb+srv://adwera:adwera@node-rest-api-mongo-0iss4.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

app.use(morgan((tokens, req, res) => {
  const time = Math.trunc(tokens['response-time'](req, res));
  let formattedTime;
  if (time.toString().length === 1) {
    formattedTime = (`0${time}`).slice(-2);
  } else {
    formattedTime = time;
  }

  const data = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    `${formattedTime}ms`
  ].join('\t\t');
  fs.appendFile('access.log', `${data}\n`, (err) => {
    if (err) console.log(err);
  });
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

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
  next();
});

module.exports = app;
