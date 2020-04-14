module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  MONGODB_CONNECTION_URI: process.env.MONGODB_URI || 'mongodb+srv://adwera:adwera@node-rest-api-mongo-0iss4.mongodb.net/test?retryWrites=true&w=majority'
};
