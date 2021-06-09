// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

const port = 9090;
// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log("server running");
    console.log(`server is running on localhost: ${port}`);
}

//GET route
app.get('/all', function(req, res) {
    res.send(projectData);
});

// Post Route
app.post('/addWeatherInfo', addInfo);

function addInfo(req, res){
    console.log(req.body);
    newEntry =
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.feelings = req.body.feelings;
    res.end();
    console.log(projectdata)
}