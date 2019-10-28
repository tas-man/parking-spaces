const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errHandler = require('./utils/err-handler');
const { API_SERVER_PORT } = require('./constants/config.json');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', require('./controllers/parking-controller'));
app.use(errHandler);

app.listen(API_SERVER_PORT, () => {
  console.log('Server listening on port ' + API_SERVER_PORT);
});