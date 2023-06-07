require('dotenv').config();
require('./src/db');
require('./src/models/file');

const express = require('express');
const cors = require('cors');
const fileRoute = require('./src/routes/fileRoute');
var api = require('express-list-endpoints-descriptor')(express);
const { masters } = require('@knovator/masters-node');
const PORT = 8080;

const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(fileRoute);
app.use(
  '/admin/masters',
  masters({
    languages: [
      {
        code: 'en',
        name: 'English',
      },
      {
        code: 'hi',
        name: 'Hindi',
      },
    ],
  })
);

app.get('/allendpoints', (req, res) => {
  //return all endpoints defined inside routes
  res.send(api.listAllEndpoints(app));
});

app.get('/endpoints', (req, res) => {
  //return all endpoints defined inside routes
  res.send(api.listEndpoints(app));
});

app.listen(PORT, () => {
  console.log(`App started on ${PORT}`);
});
