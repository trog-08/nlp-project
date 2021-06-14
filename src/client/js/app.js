// API keys and Geonames username
let geonamesUn = "trog_08";
let weatherbitAPI = "1c2ae02a8a9d4cab9f064b88476ca1c5";
let pixabayAPI = "22005634-391d887fb0bb9be783d100fb4";

//API calls
const getGeonames = async (city) => {
    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geonamesUn}`;
    const res = await fetch(url);
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      alert("Error!", error);
    }
  };
  
  const getWeatherBit = async (lat, lng) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherbitAPI}`;
    const res = await fetch(url);
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      alert("Error!", error);
    }
  };
  
  const getPixabay = async (city) => {
    const url = `https://pixabay.com/api/?key=${pixabayAPI}&q=${city}&image_type=photo`;
    const res = await fetch(url);
    try {
      const data = await res.json();
      return data;
    } catch (error) {
      alert("Error!", error);
    }
  };

//Gather the information
const performAction = async () => {
  let city = document.getElementById("city").value;
  let dateGoing = document.getElementsByClassName("datePicker")[0].value;
  let dateOfReturn = document.getElementsByClassName("datePicker")[1].value;

  //Dates
  let d = new Date();
  const daysTillDepart = Math.floor(
    (new Date(dateGoing).getTime() - d.getTime()) / (1000 * 3600 * 24)
  );
  const lengthOfTrip = Math.ceil(
    (new Date(dateOfReturn).getTime() - new Date(dateGoing).getTime()) /
      (1000 * 3600 * 24)
  );
  document.getElementById(
    "details"
  ).innerHTML = `You'll be leaving in:<br>${daysTillDepart} days <br> and home:<br> ${lengthOfTrip} days later`;

  // Bundle the API information
  getGeonames(city)
    .then((data) => {
      return postData("http://localhost:8081/geonames", {
        latitude: data.geonames[0].lat,
        longitude: data.geonames[0].lng,
      });
    })
    .then((res) => {
      const lat = res[res.length - 1].latitude;
      const lng = res[res.length - 1].longitude;
      return { lat, lng };
    })
    .then(({ lat, lng }) => {
      return getWeatherBit(lat, lng);
    })
    .then((weatherData) => {
      return postData("http://localhost:8081/weatherbit", {
        high: weatherData.data[0].high_temp,
        low: weatherData.data[0].low_temp,
        description: weatherData.data[0].weather.description,
      });
    })
    .then(() => {
      return getPixabay(city);
    })
    .then((data) => {
      return postData("http://localhost:8081/pixabay", {
        image: data.hits[0].webformatURL,
      }).then(uiUpdate());
    });
};


//Updating the UI
const uiUpdate = async () => {
  const res = await fetch("http://localhost:8081/data");
  try {
    const allData = await res.json();
    document.getElementById(
      "content"
    ).innerHTML = `Max temp: ${
      allData[allData.length - 2].high
    }<br> Min temp: ${allData[allData.length - 2].low} <br>  ${
      allData[allData.length - 2].description
    }`;
    document.getElementById("image").src = allData[allData.length - 1].image;
  } catch (error) {
    console.log(error);
  }
};

//POST it!
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//Make the button work
document.addEventListener("DOMContentLoaded", () => {
  const button_submit = document.getElementById("generate");
  button_submit.addEventListener("click", performAction);
});


//Export the functions
export {
    getGeonames,
    getWeatherBit,
    getPixabay,
  performAction,
  uiUpdate,
  postData,
};