
const express = require('express');
const bodyParser = require('body-parser');
const homeRouet = require('./src/routes/homeRoute')
const cors = require('cors');
require('dotenv').config();

// Access the environment variables
const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended:true
}))

app.use(cors());
homeRouet(app);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
