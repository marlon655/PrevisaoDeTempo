<template>
  <div id="app">
    <div class="header">
      <div class="center">
        <div class="logo">
          <router-link to="/">
            <div class="logo-img" >
              <img src="./assets/img-logo.png">
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <nav>
      <div class="center">
        <router-link to="/">Home</router-link> |
        <router-link to="/Sobre">Sobre</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>
<script>
export default {
  data(){
    return{
      sidebar: false
    }
  },
  created() {
    // Define a cor de fundo do body (background)
    document.body.style.margin = 0;
    document.body.style.backgroundColor = '#130443'; // Substitua pelo código de cor desejado
  }
  
}
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0 auto;

}
.header{
  width: 100%;
  background-color: #292D96;
}
.menu{
  display: none;
  background-color: rgb(0, 0, 0);
  border: 1px solid #0066ff;
  width: 32px;
  height: 32px;
}
.logo{
  display: flex;
  align-items: center;
  padding: 5px;
}
.logo-img{
  cursor: pointer;
  width: 100%;
  max-width: 220px;
}
.logo-img img{
  width: 100%;
  object-fit: contain;
}
nav {
  background-color: #1c0663;
  padding: 5px;
}
nav a {
  text-decoration: none;
  font-weight: bold;
  color: #424599;
}

nav a.router-link-exact-active {
  color: #02CCFB;
}
.center{
    margin: 0 auto;
    width: 100%;
    /* max-width: 1280px; */
}
</style>
