<template>
    <div class="weather" v-if="!loadWeather && !noApi">
        <div class="selected-city">
            <div class="locale">
                <span style="font-size: 16px;">{{ currentDate(weatherCurrent.t_s) }}</span>
                <span style="font-size: 18px;">{{ weatherCurrent.city }}, {{ weatherCurrent.state }}</span>
            </div>
            <div class="extra-info">
                <span>Umidade: {{ `${weatherCurrent.humidity}%` }}</span>
                <span>Visibilidade: {{ `${weatherCurrent.visibility}km` }}</span>
            </div>
        </div>

        <div class="box-weather">
            <div class="weather-header">
                <div class="weather-now flexStart">
                    <div class="weather-box-icon">
                        <div class="icon-weather-now">
                            <div class="icon-img">
                                <img :src="iconUrl(weatherCurrent.icon)" /> 
                            </div>
                        </div>
                    </div>
                    <div class="temp">
                        <h2>{{ `${(KelvinToCelsius(weatherCurrent.temp))}C` }}</h2>
                    </div>
                </div>
                <div class="weather-now flexEnd">
                    <div class="weather-mode">
                        <span>{{ weatherCurrent.mode }}</span>            
                        <span>{{ `${KelvinToCelsius(weatherCurrent.temp_max)}/${KelvinToCelsius(weatherCurrent.temp_min)}C`}}</span>
                    </div>
                </div>
            </div>

            <div class="horary">
                <div class="horary-container">
                    <div v-for="item in list" :key="item.t_s" class="box-horary">
                        <div class="inner-box-horary">
                            <span class="atThisTime">{{ nextHour(item.t_s) }}</span>
                                <div class="icon-weather">
                                    <div class="icon-img">
                                        <img :src="iconUrl(item.icon)" /> 
                                    </div>
                                </div>
                            <span class="atThisTime">{{ `${KelvinToCelsius(item.temp)}C` }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nextDays :weekDays="weekDaily"/>
    </div>
    <!-- <loaderBox v-else/> -->
    <div  v-else class="content-load-box">
        <div v-if="!noApi" class="content-load">
            <loaderBox />
        </div>
        <div v-else class="content-load">
            <errorBox :errorMsg="msgError" style="color:white"/>
        </div>
    </div>

</template>
<script>
import errorBox from '../errorBox.vue';
import loaderBox from '@/components/loaderBox.vue';
import nextDays from './nextDays.vue'
import axios from 'axios';
    export default{
    components: { loaderBox, nextDays, errorBox },
        name: 'WeatherNow',
        props:{
            localization: Object
        },
        data(){
            return{
                msgError: String,
                noApi: false,
                list:[],
                weatherCurrent:{},
                weekDaily:[],
                loadWeather: true,
                apiKey: 'cf2c807104b8f08a10dbda67a08aa4c7'
            }
        },
        created:function(){
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.localization.lat}&lon=${this.localization.long}&appid=${this.apiKey}`)
                .then(response => {
                const current = response.data.current;
                const daily = response.data.daily;
                daily.forEach(item => {
                    item.open = false;
                });
                this.weekDaily = daily;
                const hourly = response.data.hourly;
                //Agora
                this.weatherCurrent = {
                    state: this.localization.state,
                    city: this.localization.city,
                    t_s: current.dt,
                    temp: current.temp,
                    temp_min: daily[0].temp.min,
                    temp_max: daily[0].temp.max,
                    mode: current.weather[0].main,
                    icon: current.weather[0].icon,
                    humidity: current.humidity,
                    visibility: (current.visibility / 1000),
                }
                //24Hras - Neste horario
                for (let i = 1; i < 26; i++){
                    this.list.push({
                    t_s: hourly[i].dt,
                    temp: hourly[i].temp,
                    icon: hourly[i].weather[0].icon
                    });
                }
                
                this.loadWeather = false;
                })
                .catch(() => {
                    this.noApi = true;
                    this.msgError = "Erro ao fazer a integração com a api. Retorne em alguns minutos."
                  //console.error(error);
                }) 
            },
        methods: {
            KelvinToCelsius(tempKelvin) {
                const celsius = `${Math.round(tempKelvin - 273.15)}°`;
                return celsius;
            },
            iconUrl(iconCode) {
            const baseUrl = 'https://openweathermap.org/img/wn/';
            return `${baseUrl}${iconCode}.png`;
            },
            nextHour(timestamp){
                const date = new Date(timestamp * 1000);
                const hours = `${date.getHours()}:00hrs`;
                return hours;
            },
            formateZero(value){
                return value < 10 ? `0${value}` : value;
            },    
            currentDate(ts){
                const monthArray = [
                    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
                    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
                ];
                const data = new Date(ts * 1000);
                const day = data.getDate();
                // const weekDay = data.getDay();
                const month = data.getMonth();
                const hour = data.getHours();
                const minutes = data.getMinutes();

                const formated = `${monthArray[month]} ${day}, ${this.formateZero(hour)}:${this.formateZero(minutes)}`
                return formated;
            }
            }
        }
</script>
<style scoped>
::-webkit-scrollbar {
  width: 15px;
  height: 15px;
}
::-webkit-scrollbar-button {
  width: 100px;
  height: 100px;
}
::-webkit-scrollbar-thumb {
  background: #e1e1e1;
  border: 8px solid #292d96;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}
::-webkit-scrollbar-thumb:active {
  background: #170c66;
}
::-webkit-scrollbar-track {
  background: #130443;
  border: 15px double #170c66;
  border-radius: 15px;
}
::-webkit-scrollbar-track:hover {
  background: #201575;
}
::-webkit-scrollbar-track:active {
  background: #0f0939;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
/* -------------------------------------------- */
.selected-city{
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.locale{
    display: grid;
    align-items: center;
    justify-content: start;
    color: white;
    width: 100%;
    max-width: 200px;
}
.extra-info{
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: flex-end;
}
.extra-info span{
    color: aliceblue;
    font-size: 16px;
    line-height: 1.5;
}
/* -------------------------------------------- */
.flexEnd{
    justify-content: flex-end;
}
.flexStart{
    justify-content: flex-start;
}
/* -----------------Header-------------------- */
.weather{
    width: 100%;
    border-radius: 10px;
    padding: 5px;
}
.box-weather{
    border-radius: 10px;
    background-color: #170c66;
    box-shadow: 1px 1px 4px 0px #170c66, 0 0 4px 1px #170c66;
}
.weather-header{
    display: flex;
}
.weather-now{
    height: 100px;
    display: flex;
    width: 50%;
    align-items: center;
}
.temp{
    display: contents;
}
.temp h2{
    color: azure;
    font-size: 48px;
    font-weight: 200;
    padding-left: 3%;
}
.weather-mode{
    display: block;
}
.weather-mode span{
    display: block;
    color: azure;
    font-size: 28px;
}
.weather-box-icon{
    width: 100px;
    height: 100px;
    /* border: 1px solid #130443; */
}
/* ------------ Horary --------------- */
.horary{
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    padding-top: 10px;
    /* padding: 5px 0; */
}
.horary-container{
    display: flex;
    padding-bottom: 5px;
}
.box-horary{
    font-weight: 600;
    position: relative;
    min-width: calc(100% / 5);
    padding-top: calc(100% / 5);
    /* border: 1px solid #ccc; */
}
/* inside box-horary */
.inner-box-horary{
    position: absolute;
    width: 100%;
    text-align: -webkit-center;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.atThisTime{
    display: flex;
    justify-content: center;
    font-size: 18px;
    font-weight: 400;
    color: azure;
}
.icon-weather-now{
    position: relative;
    padding-top: 100%;
    width: 100%;
}
.icon-weather{
    position: relative;
    padding-top: 60%;
    width: 60%;
}
.icon-img{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.icon-img img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
/* ------- loader -------------- */
.content-load-box{
    width: 100%;
    border-radius: 10px;
    padding: 5px;
}
.content-load{
    border-radius: 10px;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #170c66;
    box-shadow: 1px 1px 4px 0px #170c66, 0 0 4px 1px #170c66;
}
/* ----------------------------------- */
@media screen and (max-width: 480px) {
    /* Header */
.weather-now{
    height: 60px;
}
.temp h2{
    font-size: 50px;
}
.weather-box-icon{
    width: 60px;
    min-width: 60px;
    height: 60px;
}
.weather-mode span{
    display: block;
    font-size: 18px;
}
.atThisTime{
    font-size: 14px;
}
.box-horary{
    padding-top: calc(100% / 4);
}
}
</style>
