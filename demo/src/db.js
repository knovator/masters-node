const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/knovator')
  .then(() => console.info('Database connected'))
  .catch((err) => {
    console.error('DB Error', err);
  });

module.exports = mongoose;