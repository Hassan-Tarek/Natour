const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

const app = express();

// MIDDLEWARES
if (process.env.ENVIRONMENT === 'Development') {
  app.use(morgan('dev'));
}
app.use(express.json);
app.use(express.static(`${__dirname}/data`));

// ROUTES
app.route('/api/v1/tours', tourRouter);
app.route('/api/v1/users', userRouter);

module.exports = app;
