module.exports = {
  connString: 'mongodb://admin:pwd@account0-shard-00-00-vuvjo.mongodb.net:27017,account0-shard-00-01-vuvjo.mongodb.net:27017,account0-shard-00-02-vuvjo.mongodb.net:27017/account?ssl=true&replicaSet=Account0-shard-0&authSource=admin',
  approvalApi: process.env.APPROVAL_API || 'http://localhost:33000',
}
