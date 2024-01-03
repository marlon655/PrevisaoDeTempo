<template>
        <div class="input-box">
        <div class="input-box-item">
          <span>Seu Estado:</span>
          <input type="text" name="state" autocomplete="off" placeholder="Digite seu Estado" v-model="searchState" @input="suggestionsStates"/>
          <div v-if="suggestionListState" class="suggestion-list">
            <ul>
              <li v-for="suggestion in suggestionState" :key="suggestion.state" @click="selectState(suggestion.state)">
                {{ suggestion.state }}
              </li>
            </ul>
          </div>
        </div>
        <div class="input-box-item" v-if="!loadingSearchCity && !selectedState">
          <span>Sua Cidade:</span>
          <input  type="text" name="city" autocomplete="off" placeholder="Digite sua Cidade" v-model="searchCity" @input="suggestionsCitys"/>
          <div v-if="suggestionListCity" class="suggestion-list">
            <ul>
              <li v-for="suggestion in suggestionCity" :key="suggestion.city" @click="selectCity(suggestion.city)">
                {{ suggestion.city }}
              </li>
            </ul>
          </div>
        </div>
        <div class="input-box-item" v-if="selectedState">
          <div class="search-load"> 
            <loaderBox/>
          </div>
        </div>

      </div>
</template>
<script>
import axios from 'axios';
import unorm from 'unorm';
import loaderBox from '@/components/loaderBox.vue';
export default{
    name: 'SearchInput',
    components:{ loaderBox },
    props:{
      states: Array
    },
    data(){
    return{
      suggestionState:[],
      searchState:'',
      geonameIdState:'',
      suggestionListState: false,
      selectedState: false,
      citys:[],
      suggestionCity:[],
      searchCity:'',
      geonameIdCity:'',
      suggestionListCity: false,
      loadingSearchCity: true,
      localization:{}
    }
    },
  methods:{
    removeAccents(input) {
      return unorm.nfd(input).replace(/[\u0300-\u036f]/g, '')
    },
    //Pesquisa de Estados brasileiros
    suggestionsStates(){
      this.suggestionState = this.states.filter(states => 
        this.removeAccents(states.state.toLowerCase()).includes(this.removeAccents(this.searchState.toLowerCase())),
      );
      //Verifica se existe um estado e se foi escrito algo no input de pesquisa.
      if(this.searchState.length > 0 && this.suggestionState.length > 0){
        this.suggestionListState = true;
        this.loadingSearchCity = true;
        this.selectedState = false;// Retirar?
        this.searchCity = ""; //apenas para limpar!
        this.$emit('loadCity', true);
        this.suggestionState.forEach((el) => {
          if(this.searchState === el.state){
            this.geonameIdState = el.geonameId;
            this.suggestionListState = false;
            this.selectedState = true;
            this.cityApi(this.geonameIdState);
          }
        });
      }else{
        this.suggestionListState = false;
      }
    },
    selectState(val) {
      this.searchState = val;
      this.suggestionsStates();
    },
    // Pesquisa de Cidades.
    cityApi(geonameId){
      axios.get(`http://api.geonames.org/childrenJSON?geonameId=${geonameId}`,{
        params:{
          username: 'marlonmartinez',
          startRow: 0,//inicio dos resultados
          maxRows: 700
        }
      })
      .then(citys => {
        // console.log(citys)
        this.citys = citys.data.geonames.map(city => ({state: city.adminCodes1.ISO3166_2 ,city: city.name, geonameId: city.geonameId,
        lat: city.lat, long: city.lng}))
        this.loadingSearchCity = false;
        this.selectedState = false;
      })
      .catch(() => {
          this.citys = [];
       //console.error(error);
      })
    },
      suggestionsCitys(){
      this.suggestionCity = this.citys.filter(citys => 
        this.removeAccents(citys.city.toLowerCase()).includes(this.removeAccents(this.searchCity.toLowerCase())),
      );
      //Verifica se existe um estado e se foi escrito algo no input de pesquisa.
      if(this.searchCity.length > 0 && this.suggestionCity.length > 0){
        this.$emit('loadCity', true);
        this.suggestionListCity = true;
        this.suggestionCity.forEach((el) => {
          if(this.searchCity === el.city){
            this.geonameIdCity = el.geonameId;
            this.suggestionListCity = false;
            this.localization = { lat:el.lat, long:el.long, city:el.city, state:el.state };
            this.$emit('coordenates', this.localization);
            this.$emit('loadCity', false);
          }
        });
      }else{
        this.$emit('loadCity', true);
        this.suggestionListCity = false;
      }
    },
    selectCity(val) {
      this.searchCity = val;
      this.suggestionsCitys();
    }
}
}
</script>
<style>
.input-box{
    margin: 0 auto;
    width: 100%;
    display: flex;
    justify-content: space-between;

}
.search-load{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.input-box-item{
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
}
.input-box-item span{
  color: #ffffff;
  font-size: 16px;
  padding-bottom: 5px;
}
.input-box-item input[type="text"] {
  padding-left: 10px;
  background-color: #130443;
  color: white;
  height: 22px;
  font-size: 16px;
  outline:none;
  width: 100%;
}
.input-box-item input[type="text"]::placeholder{
  color: rgb(191, 167, 255);
}
.suggestion-list {
  position: absolute;
  top: 55px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid #ddd;
  width: 100%;
  max-width: 190px;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
}
.suggestion-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.suggestion-list li {
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
.suggestion-list li:hover {
  background-color: #ccc;
}
@media screen and (max-width: 480px)  {
.suggestion-list{
  max-width: 150px;
}
.suggestion-list ul{
  font-size: 14px;
}
}
</style>
