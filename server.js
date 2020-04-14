const http = require('http');

const app = require('./src/app');

const port = process.env.port || 3000;

const server = http.createServer(app);

server.listen(port);
