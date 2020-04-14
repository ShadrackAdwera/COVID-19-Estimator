const http = require('http');

const mongoose = require('mongoose');

const app = require('./src/app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  mongoose.connect('mongodb+srv://adwera:adwera@node-rest-api-mongo-0iss4.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true });
});
