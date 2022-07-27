const mongoose = require('mongoose');

const dConnection = `mongodb://orbitjobsassessment_stage:ouqsaXjHUNESFYUygU6havyoLb0Zm3@164.52.192.156:27017/orbitjobsassessment`;

mongoose
  .connect(dConnection)
  .then(() => console.info('Database connected'))
  .catch((err) => {
    console.error('DB Error', err);
  });

module.exports = mongoose;