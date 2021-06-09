/* Global Variables */
let baseUrl = 'http://api.geonames.org/searchJSON?q=';
let userName = 'trog_08';

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

document.getElementById('generate').addEventListener('click', performAction);
function handleSubmit(event) {
    let city = document.getElementById('city').value;
    getGeonames(baseUrl, city, userName)
    .then(function(data) {
        console.log(data)
        postData('http://localhost:9090/addTravelInfo', {
            date: newDate,
            temp: data.main.temp
        })
        .then(updateInterface())
    });
}
    
//Adding the event listener

//Event listener function that updates the UI when the burron is clicked

    
    
    

//Creates the URL
const getGeonames = async (baseUrl, city, userName) => {
    const res = await fetch(baseUrl + city + '&maxRows=10&username=' + userName);
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch(error) {
        console.log('error', error);
    }
};

export { handleSubmit }