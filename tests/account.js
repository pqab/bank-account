const rootPath = '/account';

module.exports = {
  timeout: 10000,
  open: `${rootPath}/open`,
  close: `${rootPath}/close`,
  balance: `${rootPath}/balance`,
  withdraw: `${rootPath}/withdraw`,
  deposit: `${rootPath}/deposit`,
  transfer: `${rootPath}/transfer`
}
