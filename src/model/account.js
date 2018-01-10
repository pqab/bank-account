const mongoose = require('mongoose');

const config = require('../config/config');

mongoose.Promise = global.Promise;
mongoose.connect(config.connString, {
  useMongoClient: true
})

var Account = new mongoose.Schema({
    owner: { type: String, index: true },
    account: { type: String, index: true },
    balance: { type: Number, min: 0 }
})

var model = mongoose.model('Account', Account);

module.exports = model;
