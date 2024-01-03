<template>
    <div class="apis">
        <p>Para a geração de nomes da lista de sugestão de estados e cidades foi utilizada: <a href="https://www.geonames.org/">Geonames</a>,
            para utilizar basta cadastrar uma conta: <a href="http://api.geonames.org/">Click Aqui</a> .
        </p>
        <p>Para a previsao de tempo, no site: <a href="https://openweathermap.org/">OpenWeather</a>  a documentação é GRANDE tive um pouco de dificuldade
            pois no inicio do projeto utilizei o endpoint errado... Estava utilizando o <a href="https://openweathermap.org/forecast5">Forecast</a>, mas ele não retornava a 
            previsão de acordo com a hora local... o endpoint <a href="https://openweathermap.org/api/one-call-api">Onecall</a> resolveu este problema!.
        </p>
    </div>
</template>
<script>
export default{
    name: 'ApisSobre'
}
</script>
<style scoped>
.apis{
    padding-top: 30px;
    color: #7057bc;
    font-size: 16px;
    text-align: justify;
    font-weight: 400;
    text-indent: 20px;
    line-height: 1.5;
}
.apis a{
    color: azure;
}
</style>