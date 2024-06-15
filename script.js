const timeEl=document.getElementById('time');
const dateEl=document.getElementById('date');
const currentWeatherItemsEl=document.getElementById('current-weather-items');
const timezone=document.getElementById('timezone');
const countryEl=document.getElementById('country');
const weatherforecastEl=document.getElementById('weather-forecast');
const currentTempEl=document.getElementById('current-temp');

const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const API_KEY='0b97ad91b5e5753d3e14092f82fad671';

setInterval(()=>{
    const time=new Date();
    const month=time.getMonth();
    const date=time.getDate();
    const day=time.getDay();
    const hour=time.getHours();
    const hoursIn12HrFormat=hour>=13?hour%12:hour;
    const minutes=time.getMinutes();
    const ampm=hour>=12?'PM':'AM';

    timeEl.innerHTML=hoursIn12HrFormat + ":"+minutes.toString().padStart(2,"0")+' '+`<span id="am-pm">${ampm}</span>`
    dateEl.innerHTML=days[day] + ' , '+ date + ' '+ months[month];
});
getWeatherData()
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success)=>{
        let{latitude,longitude}=success.coords;
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`).then(res=>res.json()).then(data=>{
            console.log(data)
        })
    }) 
}