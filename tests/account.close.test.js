const request = require('supertest');
const app = require('../src/app');
const path = require('./account');

describe(`Test ${path.close}`, () => {

  test('Close a valid account', async () => {
    const account = {
      owner: 'John'
    };
    var mock = await request(app).post(path.open).type('form').send(account).set('Accept', /application\/json/);
    return request(app).post(path.close).type('form').send({
      owner: mock.body.owner,
      account: mock.body.account
    }).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        status: 'success'
      });
    })
  }, path.timeout);

  test('Close an account with non-zero balance', async () => {
    const account = {
      owner: 'John',
      balance: 500
    };
    var mock = await request(app).post(path.open).type('form').send(account).set('Accept', /application\/json/);
    return request(app).post(path.close).type('form').send({
      owner: mock.body.owner,
      account: mock.body.account
    }).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'AccountNotValid'
      });
    })
  }, path.timeout);

  test('Close an account not belongs to owner', async () => {
    const account = {
      owner: 'John'
    };
    var mock =  await request(app).post(path.open).type('form').send(account).set('Accept', /application\/json/);
    return request(app).post(path.close).type('form').send({
      owner: 'Tom',
      account: mock.body.account
    }).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'AccountNotValid'
      });
    })

  }, path.timeout);

  test('Close an account not exists', () => {
    const account = {
      owner: 'John',
      account: 'A'
    };
    return request(app).post(path.close).type('form').send(account).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'AccountNotValid'
      });
    })
  }, path.timeout);

})
