const request = require('supertest');
const app = require('../src/app');
const path = require('./account');

describe(`Test ${path.transfer}`, () => {

  test('Transfer account with not enough balance', async () => {
    const accountFrom = {
      owner: 'John',
      balance: 2000
    },
    accountTo = {
      owner: 'John'
    };
    var mockFrom = await request(app).post(path.open).type('form').send(accountFrom).set('Accept', /application\/json/),
        mockTo = await request(app).post(path.open).type('form').send(accountTo).set('Accept', /application\/json/);
    return request(app).post(path.transfer).type('form').send({
      accountFrom: mockFrom.body.account,
      accountTo: mockTo.body.account,
      amount: 5000
    }).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'AccountNotValid'
      });
    })
  }, path.timeout);

  test('Transfer with non-exists account', async () => {
    const accountFrom = {
      owner: 'John',
      balance: 2000
    };
    var mockFrom = await request(app).post(path.open).type('form').send(accountFrom).set('Accept', /application\/json/);
    return request(app).post(path.transfer).type('form').send({
      accountFrom: mockFrom.body.account,
      accountTo: 'A',
      amount: 1000
    }).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'AccountNotValid'
      });
    })
  }, path.timeout);

});
