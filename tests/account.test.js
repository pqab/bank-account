const request = require('supertest');
const app = require('../src/app')

const rootPath = '/account',
      openPath = `${rootPath}/open`,
      closePath = `${rootPath}/close`;

describe(`Test ${openPath}`, () => {

  test('Open an account without balance', () => {
    const account = {
      owner: 'John'
    }
    return request(app).post(openPath).type('form').send(account).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.owner === account.owner);
      expect(response.account !== null);
      expect(response.balance === 0);
    })
  });

  test('Open an account with balance', () => {
    const account = {
      owner: 'John',
      balance: 2000
    }
    return request(app).post(openPath).type('form').send(account).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.owner === account.owner);
      expect(response.account !== null);
      expect(response.balance === account.balance);
    })
  });

  test('Open an account with empty owner', () => {
    return request(app).post(openPath).type('form').send().set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'OwnerIsEmpty'
      });
    })
  });

  test('Open an account with Nagative balance', () => {
    const account = {
      owner: 'John',
      balance: -100
    }
    return request(app).post(openPath).type('form').send(account).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'BalanceNotPositiveNumber'
      });
    })
  });

})

describe(`Test ${closePath}`, () => {

  test('Close a valid account', async () => {
    const account = {
      owner: 'John'
    }
    var mock = await request(app).post(openPath).type('form').send(account).set('Accept', /application\/json/);
    return request(app).post(closePath).type('form').send({
      owner: mock.body.owner,
      account: mock.body.account
    }).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        status: 'success'
      });
    })
  });

  test('Close an account with non-zero balance', async () => {
    const account = {
      owner: 'John',
      balance: 500
    }
    var mock = await request(app).post(openPath).type('form').send(account).set('Accept', /application\/json/);
    return request(app).post(closePath).type('form').send({
      owner: mock.body.owner,
      account: mock.body.account
    }).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'AccountNotValid'
      });
    })
  });

  test('Close an account not belongs to owner', async () => {
    const account = {
      owner: 'John'
    }
    var mock =  await request(app).post(openPath).type('form').send(account).set('Accept', /application\/json/);
    return request(app).post(closePath).type('form').send({
      owner: 'Tom',
      account: mock.body.account
    }).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'AccountNotValid'
      });
    })

  });

  test('Close an account not exists', () => {
    const account = {
      owner: 'John',
      account: 'A'
    }
    return request(app).post(closePath).type('form').send(account).set('Accept', /application\/json/).then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'AccountNotValid'
      });
    })
  });

})
