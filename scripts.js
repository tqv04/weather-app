const apiKey = "3dc6137b99495ee3c53161ee21ef50d3";

async function getWeather(city){

const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

const res = await fetch(url);
const data = await res.json();

updateUI(data);

}

function updateUI(data){

document.getElementById("city").innerText =
data.name + ", " + data.sys.country;

document.getElementById("temp").innerText =
Math.round(data.main.temp) + "°";

document.getElementById("status").innerText =
data.weather[0].main;

document.getElementById("humidity").innerText =
data.main.humidity + "%";

document.getElementById("wind").innerText =
Math.round(data.wind.speed * 3.6) + " km/h";

document.getElementById("feels").innerText =
Math.round(data.main.feels_like) + "°";

const icon = data.weather[0].icon;

document.getElementById("icon").src =
`https://openweathermap.org/img/wn/${icon}@2x.png`;

changeBackground(data.weather[0].main);
}

async function getForecast(city){

const url =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

const res = await fetch(url);
const data = await res.json();

renderHours(data);

}

function renderHours(data){

const hoursContainer = document.getElementById("hours");

hoursContainer.innerHTML = "";

for(let i = 0; i < 7; i++){

const time = data.list[i].dt_txt.split(" ")[1].slice(0,5);

const temp = Math.round(data.list[i].main.temp);

const icon = data.list[i].weather[0].icon;

hoursContainer.innerHTML += `
<div>
${time}<br>
<img src="https://openweathermap.org/img/wn/${icon}.png"><br>
${temp}°
</div>
`;

}

}
function searchCity(){

const city = document.getElementById("searchInput").value;

getWeather(city);
getForecast(city);

}
function changeBackground(weather){

const left = document.querySelector(".left");

if(weather === "Clear"){
left.style.background = "linear-gradient(180deg,#4facfe,#00f2fe)";
}

else if(weather === "Clouds"){
left.style.background = "linear-gradient(180deg,#667db6,#8e9eab)";
}

else if(weather === "Rain"){
left.style.background = "linear-gradient(180deg,#373b44,#4286f4)";
}

}
getWeather("Hanoi");
getForecast("Hanoi");