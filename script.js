const apikey="dd9f463e0a76a5ecc9d1fdfd9e7894b7"
const weatherelement1=document.querySelector("#weather-details")
const cityvalue=document.getElementById("city-input")
const forminfo=document.querySelector("form")
const weathername=document.querySelector("h2")

forminfo.addEventListener("submit",(event)=>{
    event.preventDefault()
    const city=cityvalue.value
    getweather(city)
});

async function getweather(city){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric'`)
        if(!response.ok)
        {
            throw new Error("Response not okey")
        }
        const data=await response.json()
        const icon=data.weather[0].icon
        const temperature=Math.round(data.main.temp);
        const description=data.weather[0].description;
        const details=[`Feels like:${Math.round(data.main.feels_like)}°C`,`Humidity:${Math.round(data.main.humidity)}%`,`Wind Speed:${Math.round(data.main.feels_like)}Km/h`];
        weathername.textContent=data.name;
        weatherelement1.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon"></img>`;
        weatherelement1.querySelector(".temperature").textContent=`${temperature}°C`;
        weatherelement1.querySelector(".description").textContent=`${description}`;
        weatherelement1.querySelector(".details").innerHTML=details.map((detail)=>`<div>${detail}</div>`).join("");
        cityvalue.value="";
        cityvalue.focus();
}
catch (error) {
    weathername.textContent="";
    weatherelement1.querySelector(".icon").innerHTML="";
    weatherelement1.querySelector(".temperature").textContent="";
    weatherelement1.querySelector(".description").textContent="An error occurred. Please try again later";
    weatherelement1.querySelector(".details").innerHTML="";
    cityvalue.value="";
    cityvalue.focus();
    }
}