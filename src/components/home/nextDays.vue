<template>
    <div class="nextDays">
        <ul>
            <li v-for="(item, index) in weekDays" :key="index" @click="showDetails(index)">
                <span>{{ currentDate(item.dt) }}</span>
                <div class="weather">
                    <div class="temperature">
                        <div class="box-icon">
                            <div class="box-icon-single">
                                <div class="icon-weather">
                                    <img :src="iconUrl(item.weather[0].icon)" />
                                </div>
                            </div>
                        </div>
                        <span>{{ `${KelvinToCelsius(item.temp.max)} / ${KelvinToCelsius(item.temp.min)}C` }}</span>
                    </div>
                    <span>{{ item.weather[0].main }}</span>
                    <span>
                        <svg width="18px" height="18px" viewBox="0 0 512 512">
                            <path fill="white" d="M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z"></path>
                        </svg>
                    </span>
                </div>
            </li>
        </ul>
        <div v-for="(item, index) in weekDays" :key="index" >
        <div v-if="indexOpen === index" class="box-modal">
            <div class="exit">
                <span @click="closeDetails()">X</span>
            </div>

            <div class="top-section">
                <div class="box-icon">
                    <div class="box-icon-single">
                        <div class="icon-weather">
                            <img :src="iconUrl(item.weather[0].icon)" />
                         </div>
                    </div>
                </div>
                <div class="section-one">
                    <p>{{ item.weather[0].description }}</p>
                    <p>{{`Máxima ${KelvinToCelsius(item.temp.max)}C, Minima ${KelvinToCelsius(item.temp.min)}C`}}</p>
                </div>
            </div>

            <div class="extra-info">
                <p v-if="item.rain == null">Chuva: 0%</p>
                <p v-else>Chuva: {{`${item.rain}mm  (${item.pop * 100}%)`}}</p>
                <p>Umidade: {{`${item.humidity}%`}}</p>
            </div>

            <div class="section-one">
                <div class="table">
                    <div class="table-body">
                        <div class="table-row">
                            <div class="table-cell sOne-cell"></div>
                            <div class="table-cell sOne-cell">Manhã</div>
                            <div class="table-cell sOne-cell">Tarde</div>
                            <div class="table-cell sOne-cell">Noite</div>
                        </div>
                        <div class="table-row">
                            <div class="table-cell sOne-cell">Temperatura</div>
                            <div class="table-cell sOne-cell">{{`${KelvinToCelsius(item.temp.morn)}C`}}</div>
                            <div class="table-cell sOne-cell">{{`${KelvinToCelsius(item.temp.day)}C`}}</div>
                            <div class="table-cell sOne-cell">{{`${KelvinToCelsius(item.temp.night)}C`}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section-two">
                <div class="table">
                    <div class="table-row">
                        <div class="table-cell sTwo-cell">Nascer do Sol</div>
                        <div class="table-cell sTwo-cell">Pôr do Sol</div>
                    </div>
                    <div class="table-row">
                        <div class="table-cell sOne-cell">{{ toHours(item.sunrise)}}</div>
                        <div class="table-cell sOne-cell">{{ toHours(item.sunset) }}</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div>
</template>
<script>
    export default{
        name: 'nextDays',
        props:{ weekDays: Array },
        data(){
            return{
                indexOpen: null
            }
        },
        created:function(){
           //console.log(this.weekDays);
        },
        methods:{
            showDetails(index){
                if(this.indexOpen === index){
                    this.indexOpen = null;
                }else{
                    this.indexOpen = index;
                }
            },
            closeDetails(){
                this.indexOpen = null;
            },
            KelvinToCelsius(tempKelvin) {
                const celsius = `${Math.round(tempKelvin - 273.15)}°`;
                return celsius;
            },
            iconUrl(iconCode) {
            const baseUrl = 'https://openweathermap.org/img/wn/';
            return `${baseUrl}${iconCode}.png`;
            },
            formateZero(value){
                return value < 10 ? `0${value}` : value;
            },    
            currentDate(ts){
                const weekDayArray = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb',]
                const monthArray = [
                    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
                    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
                ];
                const data = new Date(ts * 1000);
                const day = data.getDate();
                const weekDay = data.getDay();
                const month = data.getMonth();

                const formated = `${weekDayArray[weekDay]}, ${monthArray[month]} ${day}`
                return formated;
            },
            toHours(ts){
                const date = new Date(ts * 1000);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const formated = `${this.formateZero(hours)}:${this.formateZero(minutes)}`
                return formated;
                
            }
        }
    }
</script>
<style scoped>
/* ----Tables---- */
.table{
    display: table;
}
.table-body{
    display: table-row-group;
}
.table-row{
    border-collapse: collapse;
    display: table-row;
}
.table-cell{
    border-collapse: collapse;
    display: table-cell;
}
.nextDays{
    margin-top: 10px;
    position: relative;
}
.nextDays ul{
    /* background-color:brown; */
    padding: 0;
    list-style-type: none;
}
.nextDays ul li{
    /* background-color: brown; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding: 5px 0; */
    margin: 2px 0;
    border-bottom: 1px solid #575992;
    cursor: pointer;
}
.nextDays ul li > span{
    color: white;
    font-size: 14px;
    font-weight: 200;
}
.weather{
    display: flex;
    flex-basis: 60%;
    align-items: center;
    justify-content: space-between;
}
.weather > span{
    color: #575992;
    font-size: 12px;
}
.temperature{
    display: flex;
    width: 100%;
    max-width: 110px;
    align-items: center;
    flex-wrap: wrap;
}
.weather .temperature > span{
    color: white;
    font-size: 14px;
    font-weight: 200;
}
.box-icon{
    max-width: 40px;
    width: 100%;

}
.box-icon-single{
    position: relative;
    padding-top: 100%;
}
.icon-weather{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;    
}
.icon-weather img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
/* ------------------------------------------------ */
.extra-info{
    display: flex;
    padding: 5px 0;
    width: 100%;
    max-width: 225px;
    justify-content: space-between;
}
.extra-info p{
    color: white;
    font-size: 12px;
}
/* -----------------Box-Informação----------------- */
.box-modal{
    width: 100%;
    max-width: 280px;
    /* height: 200px; */
    background-color: rgb(19, 4, 67);
    border: 1px solid white;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%,-100%);
    padding: 5px;

}
.top-section{
    display: flex;
    align-items: center;
}
.section-one{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    color: white;
    font-size: 14px;
    margin: 5px 0;
}
.section-one p{
    font-size: 16px;
    color: white;
    font-weight: 200px;
}
.sOne-cell{
    color: white;
    font-size: 14px;
    padding: 2px 5px;
}
.section-two{
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 10px;
}
.sTwo-cell{
    color: #575992;
    font-size: 10px;
    padding: 0 5px;
}
.exit{
    position: absolute;
    right: -8px;
    top: -8px;
    background: rgb(19, 4, 67);
    width: 24px;
    height: 24px;
    border-radius: 10px;
    border: 1px solid white;
    cursor: pointer;
}
.exit span{
    color: white;
    font-size: 20px;
}
</style>
