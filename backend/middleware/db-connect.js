const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('db connected');
}).catch((e) => {
  console.log(`db error ${e}`);
});


module.exports = mongoose.connection;
