const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const account = require('./routes/account');

const config = require('./config/config');

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use((req, res, next) => {
  console.log(`http request - ${req.url}`);
  next();
})

app.get('/', (req, res) => res.json({
  status: 'success'
}))

app.use('/doc', express.static(path.join(__dirname, '../doc')))

app.use('/account', account);

app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found'
  })
})

app.use((err, req, res, next) => {
  console.error(err);
  res.json({
    error: err.message
  })
})

module.exports = app;
