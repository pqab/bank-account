const request = require('supertest');
const app = require('../src/app');
const path = require('./account');

describe(`Test ${path.open}`, () => {

  test('Open an account without balance', () => {
    const account = {
      owner: 'John'
    };
    return request(app).post(path.open).type('form').send(account).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.owner === account.owner);
      expect(response.account !== null);
      expect(response.balance === 0);
    })
  }, path.timeout);

  test('Open an account with balance', () => {
    const account = {
      owner: 'John',
      balance: 2000
    };
    return request(app).post(path.open).type('form').send(account).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.owner === account.owner);
      expect(response.account !== null);
      expect(response.balance === account.balance);
    })
  }, path.timeout);

  test('Open an account with empty owner', () => {
    return request(app).post(path.open).type('form').send().set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'OwnerIsEmpty'
      });
    })
  }, path.timeout);

  test('Open an account with Nagative balance', () => {
    const account = {
      owner: 'John',
      balance: -100
    };
    return request(app).post(path.open).type('form').send(account).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'BalanceNotPositiveNumber'
      });
    })
  }, path.timeout);

})
