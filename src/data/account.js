const mongoose = require('mongoose');

const model = require('../model/account');

var account = {
  find: (obj) => new Promise((resolve, reject) => {
    model.find(obj).exec((err, data) => {
      if (err)
        return reject(err);
      resolve(data);
    })
  }),
  get: (obj) => new Promise((resolve, reject) => {
    model.findOne(obj, (err, data) => {
      if (err)
        return reject(err);
      resolve(data);
    })
  }),
  create: (obj) => new Promise((resolve, reject) => {
    new model(Object.assign({
      account: new mongoose.mongo.ObjectId()
    }, obj)).save((err, data) => {
      if (err)
        return reject(err);
      resolve(data);
    })
  }),
  delete: (obj) => new Promise((resolve, reject) => {
    model.remove(obj, (err, data) => {
      if (err)
        return reject(err);
      resolve(data);
    })
  }),
  update: (obj) => new Promise((resolve, reject) => {
    obj.save((err, data) => {
      if (err)
        return reject(err);
      resolve(data);
    })
  })
}

module.exports = account;
