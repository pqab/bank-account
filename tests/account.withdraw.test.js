const request = require('supertest');
const app = require('../src/app');
const path = require('./account');

describe(`Test ${path.withdraw}`, () => {

  test('Withdraw a valid account', async () => {
    const account = {
      owner: 'John',
      balance: 2000
    };
    var mock = await request(app).post(path.open).type('form').send(account).set('Accept', /application\/json/);
    return request(app).post(path.withdraw).type('form').send({
      account: mock.body.account,
      amount: 1000
    }).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        account: mock.body.account,
        balance: 1000
      });
    })
  }, path.timeout);

  test('Withdraw an account with not enough balance', async () => {
    const account = {
      owner: 'John',
      balance: 2000
    };
    var mock = await request(app).post(path.open).type('form').send(account).set('Accept', /application\/json/);
    return request(app).post(path.withdraw).type('form').send({
      account: mock.body.account,
      amount: 5000
    }).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'AccountNotValid'
      });
    })
  }, path.timeout);

  test('Withdraw an account not exists', async () => {
    return request(app).post(path.withdraw).type('form').send({
      account: 'A',
      amount: 100
    }).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'AccountNotValid'
      });
    })

  }, path.timeout);

  test('Withdraw an account with non-positive amount', async () => {
    const account = {
      owner: 'John',
      balance: 2000
    };
    var mock = await request(app).post(path.open).type('form').send(account).set('Accept', /application\/json/);
    return request(app).post(path.withdraw).type('form').send({
      account: mock.body.account,
      amount: -100
    }).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'AmountNotPositiveNumber'
      });
    })
  }, path.timeout);

  test('Withdraw an empty account', () => {
    return request(app).post(path.withdraw).type('form').send({}).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'AccountIsEmpty'
      });
    })
  }, path.timeout);

});
