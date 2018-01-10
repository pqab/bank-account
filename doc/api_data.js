define({ "api": [  {    "type": "post",    "url": "/account/balance",    "title": "Account balance",    "name": "AccountBalance",    "group": "Account",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "owner",            "description": "<p>Account owner</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "owner",            "description": "<p>Account owner</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "accounts",            "description": "<p>All accounts of the owner</p>"          }        ]      },      "examples": [        {          "title": "Success-Response",          "content": "HTTP/1.1 200 OK\n{\n  \"owner\": \"John\",\n  \"accounts\" {\n    \"123456\": 50,\n    \"654321\": 100\n  }\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "OwnerIsEmpty",            "description": "<p>The owner is empty</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "OwnerNotValid",            "description": "<p>The owner is not exists</p>"          }        ]      },      "examples": [        {          "title": "OwnerIsEmpty",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"OwnerIsEmpty\"\n}",          "type": "json"        },        {          "title": "OwnerNotValid",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"OwnerNotValid\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/account.js",    "groupTitle": "Account",    "sampleRequest": [      {        "url": "https://bank-account.herokuapp.com/doc/account/balance"      }    ]  },  {    "type": "post",    "url": "/account/close",    "title": "Close account",    "name": "CloseAccount",    "group": "Account",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "owner",            "description": "<p>Account owner</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "account",            "description": "<p>Account</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>success</p>"          }        ]      },      "examples": [        {          "title": "Success-Response",          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "AccountIsEmpty",            "description": "<p>The account is empty</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "AccountNotValid",            "description": "<p>The account is not exists or balance is not zero</p>"          }        ]      },      "examples": [        {          "title": "AccountIsEmpty",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"AccountIsEmpty\"\n}",          "type": "json"        },        {          "title": "AccountNotValid",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"AccountNotValid\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/account.js",    "groupTitle": "Account",    "sampleRequest": [      {        "url": "https://bank-account.herokuapp.com/doc/account/close"      }    ]  },  {    "type": "post",    "url": "/account/deposit",    "title": "Deposit money",    "name": "DepositMoney",    "group": "Account",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "account",            "description": "<p>Account</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "amount",            "description": "<p>Deposit amount</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "account",            "description": "<p>Account</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "balance",            "description": "<p>Account balance</p>"          }        ]      },      "examples": [        {          "title": "Success-Response",          "content": "HTTP/1.1 200 OK\n{\n  \"account\": \"123456\",\n  \"balance\": \"500\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "AccountIsEmpty",            "description": "<p>The account is empty</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "AmountNotPositiveNumber",            "description": "<p>The amount not a positive number</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "AccountNotValid",            "description": "<p>The account is not exists</p>"          }        ]      },      "examples": [        {          "title": "AccountIsEmpty",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"AccountIsEmpty\"\n}",          "type": "json"        },        {          "title": "AmountNotPositiveNumber",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"AmountNotPositiveNumber\"\n}",          "type": "json"        },        {          "title": "AccountNotValid",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"AccountNotValid\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/account.js",    "groupTitle": "Account",    "sampleRequest": [      {        "url": "https://bank-account.herokuapp.com/doc/account/deposit"      }    ]  },  {    "type": "post",    "url": "/account/open",    "title": "Open account",    "name": "OpenAccount",    "group": "Account",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "owner",            "description": "<p>Account owner</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": true,            "field": "balance",            "description": "<p>Account balance (default: 0)</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "owner",            "description": "<p>Account owner</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "account",            "description": "<p>Account</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "balance",            "description": "<p>Account balance</p>"          }        ]      },      "examples": [        {          "title": "Success-Response",          "content": "HTTP/1.1 200 OK\n{\n  \"owner\": \"John\",\n  \"account\": \"123456\",\n  \"balance\": \"500\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "OwnerIsEmpty",            "description": "<p>The owner is empty</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "BalanceNotPositiveNumber",            "description": "<p>The balance of the Account not a positive number</p>"          }        ]      },      "examples": [        {          "title": "OwnerIsEmpty",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"OwnerIsEmpty\"\n}",          "type": "json"        },        {          "title": "BalanceNotPositiveNumber",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"BalanceNotPositiveNumber\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/account.js",    "groupTitle": "Account",    "sampleRequest": [      {        "url": "https://bank-account.herokuapp.com/doc/account/open"      }    ]  },  {    "type": "post",    "url": "/account/transfer",    "title": "Transfer money",    "name": "TransferMoney",    "group": "Account",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "accountFrom",            "description": "<p>Account from</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "accountTo",            "description": "<p>Account to</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "amount",            "description": "<p>Transfer amount</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "status",            "description": "<p>success</p>"          }        ]      },      "examples": [        {          "title": "Success-Response",          "content": "HTTP/1.1 200 OK\n{\n  \"status\": \"success\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "AccountFromIsEmpty",            "description": "<p>The account from is empty</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "AccountToIsEmpty",            "description": "<p>The account to is empty</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "AmountNotPositiveNumber",            "description": "<p>The amount not a positive number</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "AccountNotValid",            "description": "<p>The account from is not exists or not enough balance, or the account to is not exists</p>"          }        ]      },      "examples": [        {          "title": "AccountFromIsEmpty",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"AccountFromIsEmpty\"\n}",          "type": "json"        },        {          "title": "AccountToIsEmpty",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"AccountToIsEmpty\"\n}",          "type": "json"        },        {          "title": "AmountNotPositiveNumber",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"AmountNotPositiveNumber\"\n}",          "type": "json"        },        {          "title": "AccountNotValid",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"AccountNotValid\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/account.js",    "groupTitle": "Account",    "sampleRequest": [      {        "url": "https://bank-account.herokuapp.com/doc/account/transfer"      }    ]  },  {    "type": "post",    "url": "/account/withdraw",    "title": "Withdraw money",    "name": "WithdrawMoney",    "group": "Account",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "account",            "description": "<p>Account</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "amount",            "description": "<p>Withdraw amount</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "account",            "description": "<p>Account</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "balance",            "description": "<p>Account balance</p>"          }        ]      },      "examples": [        {          "title": "Success-Response",          "content": "HTTP/1.1 200 OK\n{\n  \"account\": \"123456\",\n  \"balance\": \"500\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "AccountIsEmpty",            "description": "<p>The account is empty</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "AmountNotPositiveNumber",            "description": "<p>The amount not a positive number</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "AccountNotValid",            "description": "<p>The account is not exists or not enough balance</p>"          }        ]      },      "examples": [        {          "title": "AccountIsEmpty",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"AccountIsEmpty\"\n}",          "type": "json"        },        {          "title": "AmountNotPositiveNumber",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"AmountNotPositiveNumber\"\n}",          "type": "json"        },        {          "title": "AccountNotValid",          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"AccountNotValid\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "src/routes/account.js",    "groupTitle": "Account",    "sampleRequest": [      {        "url": "https://bank-account.herokuapp.com/doc/account/withdraw"      }    ]  }] });
