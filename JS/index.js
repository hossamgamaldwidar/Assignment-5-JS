// TODAY
let todayName = document.querySelector(".today-name")
let todayNumber = document.querySelector(".today-number")
let monthName = document.querySelector(".month-name")
let cityName = document.querySelector(".city-name")
let temperature = document.querySelector(".temperature")
let temperatureIcon = document.querySelector(".temperature-icon")
let tempDescription = document.querySelector(".temp-description")
let humidity = document.querySelector(".humidity")
let air = document.querySelector(".air")
let navegation = document.querySelector(".navegation")
let date = new Date()
let inputSearch = document.querySelector(".input-search")
// NEXT DAY
let nextDayIcon = document.querySelectorAll(".next-day-icon")
let maxNextDay = document.querySelectorAll(".max-next-day")
let minNextDay = document.querySelectorAll(".min-next-day")
let tempText = document.querySelectorAll(".temp-text")
let nextDate = document.querySelectorAll(".next-date")


async function getWitherData(city="cairo") {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b281e4d0fea04402842105327242112&q=${city}&days=3`)
    let data = await response.json()
    displayTodayData(data)
    displayNextDay(data)
}
getWitherData()
function displayTodayData(data) {
    
    todayName.innerHTML = date.toLocaleDateString("en-US", { weekday: "long" }); 
    todayNumber.innerHTML = date.getDate()
    monthName.innerHTML = date.toLocaleDateString("en-US",{month:"long"})
    cityName.innerHTML = data.location.name
    temperature.innerHTML = data.current.temp_c+"C"
    tempDescription.innerHTML = data.current.condition.text
    navegation.innerHTML = data.current.wind_dir
    air.innerHTML = data.current.feelslike_c+"m/h"
    humidity.innerHTML = data.current.humidity+"%"
    temperatureIcon.setAttribute("src", data.current.condition.icon)
}
function displayNextDay(data){
    let nextDay = data.forecast.forecastday
    for (let i = 0 ; i < 2 ; i++){
        let nextone = new Date(nextDay[i+1].date)
        nextDate[i].innerHTML = nextone.toLocaleDateString("en-US", { weekday: "long" });
        nextDayIcon[i].setAttribute("src", nextDay[i+1].day.condition.icon)
        maxNextDay[i].innerHTML = nextDay[i+1].day.maxtemp_c
        minNextDay[i].innerHTML = nextDay[i+1].day.mintemp_c
        tempText[i].innerHTML = nextDay[i+1].day.condition.text
    }
}
inputSearch.addEventListener("input",function() {
    getWitherData(inputSearch.value)
})