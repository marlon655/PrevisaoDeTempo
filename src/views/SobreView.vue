<template>
  <div class="about">
    <div class="center">
      <div @click="menu()" id="mobile-menu">
        <img src="../assets/menu-mobile.png">
      </div>
      <div v-if="openMenu" class="sidebar">
        <div class="inside-bar">
          <ul>
            <li @click="scrollToSection('introducao')">Introdução</li>
            <li @click="scrollToSection('desafios')">Desafios</li>
            <li @click="scrollToSection('dificuldades')">Dificuldades</li>
            <li @click="scrollToSection('aprendizados')">Aprendizados</li>
            <li @click="scrollToSection('tecnologias')">Tecnologias</li>
            <li @click="scrollToSection('apis')">Apis</li>
          </ul>
        </div>
      </div>
      <div class="content" :style="contentStyle">
        <div class="inner-content">
          <div id="introducao"><Introducao /></div>
          <div id="desafios"><Desafios /></div>
          <div id="dificuldades"><Dificuldades /></div>
          <div id="aprendizados"><Aprendizados /></div>
          <div id="tecnologias"><Tecnologias /></div>
          <div id="apis"><Apis/></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Introducao from '@/components/sobre/Introducao.vue';
import Desafios from '@/components/sobre/Desafios.vue';
import Dificuldades from '@/components/sobre/Dificuldades.vue';
import Aprendizados from '@/components/sobre/Aprendizado.vue';
import Tecnologias from '@/components/sobre/Tecnologia.vue';
import Apis from '@/components/sobre/Apis.vue';
export default{
  name: 'SobreView',
  components:{
    Introducao,
    Desafios,
    Dificuldades,
    Aprendizados,
    Tecnologias,
    Apis
  },
  data(){
    return{
      openMenu: false,
      isMobile: Boolean,
      screenWith: window.innerWidth
    }
  },
  mounted(){
    this.resizeFormat(),
    window.addEventListener('resize', this.resizeFormat);
  },
  beforeUnmount() {
    this.resizeFormat(),
    window.removeEventListener('resize', this.resizeFormat);
  },
  methods:{
    scrollToSection(sectionId){
      let section = document.getElementById(sectionId);
      if(section){
        if(this.isMobile){
          this.openMenu = false;
        }
        section.scrollIntoView({ behavior: 'smooth'})
      }
    },
    menu(){
      if(!this.openMenu){
        this.openMenu = true;
      }else{
        this.openMenu = false;
      }
    },
    resizeFormat(){
      this.screenWith = window.innerWidth;
      if(this.screenWith > 768){
        this.isMobile = false;
        this.openMenu = true;
      }else{
        this.isMobile = true;
        this.openMenu = false;
      }
    }
  },
  computed:{
    contentStyle(){
      return{
        width: this.isMobile ? '100%' : 'calc(100% - 160px)'
        // width: this.openMenu ? 'calc(100% - 160px)' : '100%'
      }
    }
  }
}
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* -------------- */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  background: #e1e1e1;
  border: 8px solid #292d96;
  border-radius: 5px;
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
/* ---------------------------------- */
.clear{
  clear: both;
}
.center{
    margin: 0 auto;
    width: 100%;
    /* max-width: 1280px; */
}
.about{
  width: 100%;
  height: 100%;
  /* background-color: #292D96; */
  /* box-shadow: 10px 10px 15px 0px rgba(41, 45, 150,1 ),-10px -10px 15px 0px rgba(41, 45, 150, 1),-10px 10px 15px 0px rgba(41, 45, 150, 1),10px -10px 15px 0px rgba(41, 45, 150, 1); */
}
.sidebar{
  z-index: 8;
  border-right: 2px solid black;
  position: absolute;
  max-width: 160px;
  width: 100%;
  height: calc(100% - 74px);
}
.inside-bar{
  background-color: #292d64;
  height: 100%;
}
.inside-bar ul{
  text-align: initial;
}
.inside-bar ul li{
  list-style-type: none;
  color: #130443;
  padding: 10px;
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
}
.inside-bar ul li:hover{
  background-color: #292D96;
}
.content{
  position: absolute;
    height: calc(100% - 74px);
    width: calc(100% - 160px);
    padding: 1%;
    /* background-color: black; */
    right: 0;
}
.inner-content{
  overflow: auto;
  height: 100%;
  padding: 2%;
  box-shadow: 2px 2px 5px 0px rgba(41, 45, 150,1 ), -2px -2px 5px 0px rgba(41, 45, 150, 1), -2px 2px 5px 0px rgba(41, 45, 150, 1), 2px -2px 5px 0px rgba(41, 45, 150, 1);
}
#mobile-menu{
  display: none;
    position: fixed;
    z-index: 9;
    top: 30px;
    margin: 10px;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    /* border: 1px solid black;
    background-color: rgba(41, 45, 150, 1); */
  }
  #mobile-menu img{
  width: 100%;
  object-fit: contain;
}
#mobile-menu img{
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  object-fit: contain;
}

@media screen and (max-width: 768px){
#mobile-menu{
  display: block;
}
}
</style>
