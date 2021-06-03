// dotenv for private API key
const dotenv = require('dotenv');
dotenv.config();

//Global variables
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch')

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// express
const app = express();
app.use(express.static('dist'));

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
app.use(cors());

console.log(__dirname)

// API variables
let baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const apiKey = process.env.API_KEY;

// get route
app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'))
})
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
app.get('/all', function (req, res) {
    res.send(mockAPIResponse)
})

//POST request
app.post('/getSentiment', async(req, res) => {
  console.log(req.body.inputText)
  const apiData = await fetch(baseURL + apiKey + '&of=json&url=' + req.body.inputText + '&lang=en', {
    method: 'POST'
  });
  try {
    const data = await apiData.json()
    console.log(apiData)
    console.log("::: apiData :::", data)
    res.send(data);
  }
  catch (err) {
    console.log("error", err)
  }
});