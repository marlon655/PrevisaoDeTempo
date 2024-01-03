<template>
  <div class="home">
    <HomeOpener v-if="loadingCity"/>
    <div v-if="noApi" class="box">
      <errorBox :errorMsg="msgError"/>
    </div>
    <div v-else class="box">
      <SearchInput :states="states" v-on:loadCity="loadSearchCity" @coordenates="weatherLocalization" />
      <WeatherNow v-if="!loadingCity" :localization="localization"/>
      
    </div>
  </div>
</template>

<script>
import SearchInput from '../components/home/SearchInput.vue';
import WeatherNow from '@/components/home/WeatherNow.vue';
import HomeOpener from '@/components/home/HomeOpener.vue';
import axios from 'axios';
import errorBox from '@/components/errorBox.vue';
export default {
  name: 'HomeView',
  components: {
    SearchInput,
    WeatherNow,
    HomeOpener,
    errorBox
  },
  data(){
    return{
      states:[],
      localization:{},
      loadingCity: true,
      msgError: String,
      noApi: false
    }
  },
  created:function(){
    // http://api.geonames.org/childrenJSON?geonameId=3469034
    axios.get(`http://api.geonames.org/childrenJSON?geonameId=3469034`,{
        params:{
        username: 'marlonmartinez',
      }
    }).then(states => {
      this.states = states.data.geonames.map(state => ({state: state.name, geonameId: state.geonameId}));
      this.noApi = false;
      // this.loading = false;
    })
    .catch(() => {
      this.noApi = true;
      this.msgError = "Erro ao fazer a integração com a api. Retorne em alguns minutos."
      //console.log(error);
    })
  },
  methods:{
    loadSearchCity(load){
      this.loadingCity = load;
    },
    weatherLocalization(local){
      this.localization = local;
    }
  }

}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.home{
  /* display: flex;
  justify-content: center; */
  width: 100%;
  padding: 0 1%;
}
.box{
  margin: 0 auto;
  margin-bottom: 2%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  max-width: 500px;
  padding: 5px;
  background-color: #292D96;
  -webkit-box-shadow: 7px 7px 5px 0px rgba(23,12,102,1);
  -moz-box-shadow: 7px 7px 5px 0px rgba(23,12,102,1);
  box-shadow: 7px 7px 5px 0px rgba(23,12,102,1);
}
</style>
