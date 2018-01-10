const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator/check');
const axios = require('axios');

const config = require('../config/config');
const acc = require('../data/account');

const fee = 100;

/**
 * @api {post} /account/open Open account
 * @apiName OpenAccount
 * @apiGroup Account
 *
 * @apiParam {String} owner Account owner
 * @apiParam {Number} [balance] Account balance (default: 0)
 *
 * @apiSuccess {String} owner Account owner
 * @apiSuccess {String} account Account
 * @apiSuccess {String} balance Account balance
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "owner": "John",
 *       "account": "123456",
 *       "balance": "500"
 *     }
 *
 * @apiError OwnerIsEmpty The owner is empty
 *
 * @apiErrorExample OwnerIsEmpty
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "OwnerIsEmpty"
 *     }
 *
 * @apiError BalanceNotPositiveNumber The balance of the Account not a positive number
 *
 * @apiErrorExample BalanceNotPositiveNumber
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "BalanceNotPositiveNumber"
 *     }
 *
 */
router.post('/open', [
  body('owner', 'OwnerIsEmpty').trim().not().isEmpty(),
  body('balance', 'BalanceNotPositiveNumber').optional().isFloat({ min: 0 })
], async (req, res, next) => {

  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.array();
    res.status(400);
    return next(new Error(msg));
  }

  try {
    var data = await acc.create(req.body);
    const { account, owner, balance } = data;
    res.json({
      account: account,
      owner: owner,
      balance: balance
    });
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

/**
 * @api {post} /account/close Close account
 * @apiName CloseAccount
 * @apiGroup Account
 *
 * @apiParam {String} owner Account owner
 * @apiParam {String} account Account
 *
 * @apiSuccess {String} status success
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success"
 *     }
 *
 * @apiError AccountIsEmpty The account is empty
 *
 * @apiErrorExample AccountIsEmpty
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AccountIsEmpty"
 *     }
 *
 * @apiError AccountNotValid The account is not exists or balance is not zero
 *
 * @apiErrorExample AccountNotValid
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AccountNotValid"
 *     }
 *
 */
 router.post('/close', [
   body('account', 'AccountIsEmpty').trim().not().isEmpty(),
   body('account', 'AccountNotValid').custom((value, { req }) => new Promise((resolve, reject) => {
     acc.get(req.body).then(data => resolve(data && !data.balance && data.owner === req.body.owner))
   }))
 ], async (req, res, next) => {

   const err = validationResult(req);
   if (!err.isEmpty()) {
     const [{ msg }] = err.array();
     res.status(400);
     return next(new Error(msg));
   }

   try {
     await acc.delete(await acc.get(req.body));
     res.json({
       'status': 'success'
     });
   } catch (err) {
     res.status(500);
     return next(err);
   }
 });

/**
 * @api {post} /account/withdraw Withdraw money
 * @apiName WithdrawMoney
 * @apiGroup Account
 *
 * @apiParam {String} account Account
 * @apiParam {Number} amount Withdraw amount
 *
 * @apiSuccess {String} account Account
 * @apiSuccess {Number} balance Account balance
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "account": "123456",
 *       "balance": "500"
 *     }
 *
 * @apiError AccountIsEmpty The account is empty
 *
 * @apiErrorExample AccountIsEmpty
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AccountIsEmpty"
 *     }
 *
 * @apiError AmountNotPositiveNumber The amount not a positive number
 *
 * @apiErrorExample AmountNotPositiveNumber
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AmountNotPositiveNumber"
 *     }
 *
 * @apiError AccountNotValid The account is not exists or not enough balance
 *
 * @apiErrorExample AccountNotValid
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AccountNotValid"
 *     }
 *
 */
router.post('/withdraw', [
  body('account', 'AccountIsEmpty').trim().not().isEmpty(),
  body('amount', 'AmountNotPositiveNumber').isFloat({ min: 0 }),
  body('account', 'AccountNotValid').custom((value, { req }) => new Promise((resolve, reject) => {
    acc.get({
      account: req.body.account
    }).then(data => resolve(data && (data.balance - req.body.amount) >= 0))
  }))
], async (req, res, next) => {

  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.array();
    res.status(400);
    return next(new Error(msg));
  }

  try {
    var result = await acc.get({
      account: req.body.account
    });
    result.balance -= req.body.amount;
    // TODO: getapproval
    await acc.update(result);
    res.json({
      account: result.account,
      balance: result.balance
    });
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

/**
 * @api {post} /account/deposit Deposit money
 * @apiName DepositMoney
 * @apiGroup Account
 *
 * @apiParam {String} account Account
 * @apiParam {Number} amount Deposit amount
 *
 * @apiSuccess {String} account Account
 * @apiSuccess {Number} balance Account balance
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "account": "123456",
 *       "balance": "500"
 *     }
 *
 * @apiError AccountIsEmpty The account is empty
 *
 * @apiErrorExample AccountIsEmpty
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AccountIsEmpty"
 *     }
 *
 * @apiError AmountNotPositiveNumber The amount not a positive number
 *
 * @apiErrorExample AmountNotPositiveNumber
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AmountNotPositiveNumber"
 *     }
 *
 * @apiError AccountNotValid The account is not exists
 *
 * @apiErrorExample AccountNotValid
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AccountNotValid"
 *     }
 *
 */
router.post('/deposit', [
  body('account', 'AccountIsEmpty').trim().not().isEmpty(),
  body('amount', 'AmountNotPositiveNumber').isFloat({ min: 0 }),
  body('account', 'AccountNotValid').custom((value, { req }) => new Promise((resolve, reject) => {
    acc.get({
      account: req.body.account
    }).then(data => resolve(data));
  }))
], async (req, res, next) => {

  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.array();
    res.status(400);
    return next(new Error(msg));
  }

  try {
    var result = await acc.get({
      account: req.body.account
    });
    result.balance += parseFloat(req.body.amount);
    await acc.update(result);
    res.json({
      account: result.account,
      balance: result.balance
    });
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

/**
 * @api {post} /account/transfer Transfer money
 * @apiName TransferMoney
 * @apiGroup Account
 *
 * @apiParam {String} accountFrom Account from
 * @apiParam {String} accountTo Account to
 * @apiParam {Number} amount Transfer amount
 *
 * @apiSuccess {String} status success
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success"
 *     }
 *
 * @apiError AccountFromIsEmpty The account from is empty
 *
 * @apiErrorExample AccountFromIsEmpty
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AccountFromIsEmpty"
 *     }
 *
 * @apiError AccountToIsEmpty The account to is empty
 *
 * @apiErrorExample AccountToIsEmpty
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AccountToIsEmpty"
 *     }
 *
 * @apiError AmountNotPositiveNumber The amount not a positive number
 *
 * @apiErrorExample AmountNotPositiveNumber
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AmountNotPositiveNumber"
 *     }
 *
 * @apiError AccountNotValid The account from is not exists or not enough balance, or the account to is not exists
 *
 * @apiErrorExample AccountNotValid
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "AccountNotValid"
 *     }
 *
 */
router.post('/transfer', [
  body('accountFrom', 'AccountFromIsEmpty').trim().not().isEmpty(),
  body('accountTo', 'AccountToIsEmpty').trim().not().isEmpty(),
  body('amount', 'AmountNotPositiveNumber').isFloat({ min: 0 }),
  body('accountFrom', 'AccountNotValid').custom((value, { req }) => new Promise((resolve, reject) => {
    acc.find({
      account: { $in: [req.body.accountFrom, req.body.accountTo] }
    }).then(data => {
      if (!data || data.length !== 2)
        return resolve(false);
      var from = data[0].account === req.body.accountFrom? data[0] : data[1];
          to = data[0].account === req.body.accountTo? data[0] : data[1];
      from.balance -= req.body.amount;
      from.balance -= from.owner === to.owner? 0 : fee;
      resolve(from.balance >= 0);
    })
  }))
], async (req, res, next) => {

  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.array();
    res.status(400);
    return next(new Error(msg));
  }

  try {
    var from = await acc.get({
      account: req.body.accountFrom
    });
    var to = await acc.get({
      account: req.body.accountTo
    });
    from.balance -= parseFloat(req.body.amount);
    from.balance -= from.owner === to.owner? 0 : fee;
    to.balance += parseFloat(req.body.amount);
    await axios.get(config.approvalApi);
    await acc.update(from);
    await acc.update(to);
    res.json({
      account: from.account,
      balance: from.balance
    });
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

/**
 * @api {post} /account/balance Account balance
 * @apiName AccountBalance
 * @apiGroup Account
 *
 * @apiParam {String} owner Account owner
 *
 * @apiSuccess {String} owner Account owner
 * @apiSuccess {Object} accounts All accounts of the owner
 *
 * @apiSuccessExample Success-Response
 *     HTTP/1.1 200 OK
 *     {
 *       "owner": "John",
 *       "accounts" {
 *         "123456": 50,
 *         "654321": 100
 *       }
 *     }
 *
 * @apiError OwnerIsEmpty The owner is empty
 *
 * @apiErrorExample OwnerIsEmpty
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "OwnerIsEmpty"
 *     }
 *
 * @apiError OwnerNotValid The owner is not exists
 *
 * @apiErrorExample OwnerNotValid
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "OwnerNotValid"
 *     }
 *
 */
router.post('/balance', [
  body('owner', 'OwnerIsEmpty').trim().not().isEmpty(),
  body('owner', 'OwnerNotValid').custom((value, { req }) => new Promise((resolve, reject) => {
    acc.get(req.body).then(data => resolve(data));
  }))
], async (req, res, next) => {

  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{ msg }] = err.array();
    res.status(400);
    return next(new Error(msg));
  }

  try {
    var accounts = await acc.find(req.body);
    res.json({
      owner: req.body.owner,
      accounts: accounts.reduce((obj, value) => {
        obj[value.account] = value.balance;
        return obj;
      }, {})
    });
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

module.exports = router;
