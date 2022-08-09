require('dotenv').config();
require('./src/db');
require('./src/models/file');

const express = require('express');
const cors = require('cors');
const fileRoute = require('./src/routes/fileRoute');
const { masters, Master } = require('../.');
const PORT = 8080;

const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(fileRoute);
app.use('/admin/masters', masters());

app.listen(PORT, () => {
  console.log(`App started on ${PORT}`);
});
