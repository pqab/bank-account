const request = require('supertest');
const app = require('../src/app');
const path = require('./account');

describe(`Test ${path.balance}`, () => {

  test('Get balance with valid owner', async () => {
    const time = new Date().getTime().toString(),
          account = {
            owner: time,
            balance: 2000
          };
    var mock = await request(app).post(path.open).type('form').send(account).set('Accept', /application\/json/);
    return request(app).post(path.balance).type('form').send({
      owner: time
    }).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        owner: time,
        accounts: {
          [mock.body.account]: 2000
        }
      });
    })
  }, path.timeout);

  test('Get balance with empty owner', () => {
    return request(app).post(path.balance).type('form').send({}).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'OwnerIsEmpty'
      });
    })
  }, path.timeout);

  test('Get balance with invalid owner', () => {
    return request(app).post(path.balance).type('form').send({
      owner: 'A'
    }).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'OwnerNotValid'
      });
    })
  }, path.timeout);

});
