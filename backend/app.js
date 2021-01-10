const express = require('express');
const app = express();
const PORT = 8281;

var bodyParser = require('body-parser');

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
var router = require('./router/main')(app);