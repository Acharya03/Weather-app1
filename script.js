
const timeEl=document.getElementById('time');
const dateEl=document.getElementById('date');
const currentWeatherItemsEl=document.getElementById('current-weather-items');
const timeZone=document.getElementById('time-zone');
const countryEl=document.getElementById('country');
const weatherforecastEl=document.getElementById('weather-forecast');
const currentTempEl=document.getElementById('current-temp');

const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const API_KEY="aba6ff9d6de967d5eac6fd79114693cc";

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
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res=>res.json()).then(data=>{
            console.log(data)
            showWeatherData(data);
        }) 
    }) 
}
function showWeatherData(data){
    let{temp,feels_like,humidity,pressure,sunrise,sunset}=data.current;
   timeZone.innerHTML=data.timezone;
  console.log(data.timezone);
   countryEl.innerHTML=data.lat+'N '+data.lon+'E';
    currentWeatherItemsEl.innerHTML=` <div class="weather-item">
    <div>Temp</div>
    <div>${temp.toFixed(0)}&#176; C</div>
</div>
<div class="weather-item">
    <div>Feels like</div>
    <div>${feels_like.toFixed(0)}&#176; C</div>
</div>
<div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}%</div>
</div>
<div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
</div>
<div class="weather-item">
    <div>Sunrise</div>
    <div>${window.moment(sunrise*1000).format('HH:mm a')} </div>
    </div>
    <div class="weather-item">
    <div>Sunset</div>
    <div>${window.moment(sunset*1000).format('HH:mm a')} </div>`;
      let otherDayForcast='';
      data.daily.forEach((day,idx)=>{
        if(idx==0){
            currentTempEl.innerHTML=`<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather-icon" class="w-icon">
            <div class="other">
                  <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                  <div class="temp">Night - ${day.temp.night.toFixed(0)}&#176; C</div>
                  <div class="temp">Day - ${day.temp.day.toFixed(0)}&#176; C</div> 
              </div>`
        }else{
            otherDayForcast+=` <div class="weather-forecast" id="weather-forecast">
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src=" https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night.toFixed(0)}&#176; C</div>
                <div class="temp">Day - ${day.temp.day.toFixed(0)}&#176; C</div> 
            </div>`
        }
      })
      weatherforecastEl.innerHTML=otherDayForcast;
}