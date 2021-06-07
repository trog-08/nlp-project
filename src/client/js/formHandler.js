/* Global Variables */
let baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=3a2e63b1d19a0289c4f51a34ef52439e';
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const feelings = document.getElementById('feelings').value;

//POST function that sends data to the server.js file
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newdata = await response.json();
        console.log(newdata);
        return newdata
    } catch(error) {
        console.log('error', error);
    }
};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
//Adding the event listener
document.getElementById('generate').addEventListener('click', performAction);
//Event listener function that updates the UI when the burron is clicked
function performAction(event){
    
    let zip = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value
    getWeatherData(baseUrl, zip, apiKey)
    .then(function(data) {
        console.log(data)
        postData('http://localhost:8080/addWeatherInfo', {
            date: newDate,
            temp: data.main.temp,
            feelings: feelings
        })
        .then(updateInterface())
    });
}
//async function that updates the UI and then feeds it to the event listener
const updateInterface = async () => {
    const req = await fetch ('http://localhost:8080/all');
    try{
        const allData = await req.json();
        console.log(allData);
        document.getElementById('content').innerHTML = `Aww, dont feel: ${allData.feelings}`;
        document.getElementById('date').innerHTML = `date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `${allData.temp} C`;
    } catch(error) {
        console.log('error', error);
    }
}
//Creates the URL
const getWeatherData = async (baseUrl, zip, apiKey) => {
    const res = await fetch(baseUrl+zip+apiKey+'&units=metric');
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch(error) {
        console.log('error', error);
    }
};