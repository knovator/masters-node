const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.info('Database connected'))
  .catch((err) => {
    console.error('DB Error', err);
  });

module.exports = mongoose;