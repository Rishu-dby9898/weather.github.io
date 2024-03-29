

const weatherApi = {
    // keyt or token / username / password /  ==> genration
    key: //"Enter your Api key here..",//            //demo key ==> login ID / login authentication
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
      
    }

}); 

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    })
    .catch((error) => {
        console.log('Error1:', error);
   
    }).then(showWeatherReport)
    .catch((error) => {
        console.log('Error:', error);
      });

}

// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);
    if(weather.message && weather.cod){
        document.getElementById('error').style.display = 'block';
        document.body.style.backgroundImage = "url('./images/sunny.jpg')";  
        document.querySelector('.weather-body').style.display = "none";
        document.getElementById('error').innerHTML = 
         `<div class="alert alert-danger alert-dismissible" role="alert">
        <div>${weather.message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
        // alert(weather.message);
        return false;
    }

    document.querySelector('.weather-body').style.display = "block";
    document.getElementById('error').style.display = 'none';

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    
    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";   
    }

     else if(weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url('images/cloud.jpg')";    
    }

     else if(weatherType.textContent == 'Haze') {
    document.body.style.backgroundImage = "url('images/cloud.jpg')";       
    } 

       else if(weatherType.textContent == 'Rain') {
        document.body.style.backgroundImage = "url('images/rain.jpg')";    
    }

     else if(weatherType.textContent == 'Snow') {
     document.body.style.backgroundImage = "url('images/snow.jpg')";   
    }

     else if(weatherType.textContent == 'Thunderstorm') {
     document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";       
    } 
}

// Date manage
function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}



