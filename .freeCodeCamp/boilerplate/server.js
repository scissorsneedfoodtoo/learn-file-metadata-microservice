require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});



// Do not change code below this line
const listener = app.listen('8080', function () {
  let url = 'http://localhost:8080/';

  const codeAllyPort = process.env.CODEALLY_PORT_8080;
  if (codeAllyPort) url = codeAllyPort.replace('silisky.com', 'codeally.io');

  console.log('Your app is listening on port ' + listener.address().port);
  console.log(`Navigate to ${url} in your browser to view your web page`);
});
