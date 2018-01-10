const app = require('./app');

const PORT = process.env.PORT || 33000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
})
