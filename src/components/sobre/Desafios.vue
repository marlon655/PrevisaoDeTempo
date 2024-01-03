<template>
    <div class="desafios">
        <p>Um dos aspectos mais desafiadores que enfrentei foi a integração de duas APIs de sites distintos.
        Essa tarefa trouxe consigo uma série de aprendizados e oportunidades para aprimorar minhas habilidades técnicas.</p>
        <p>Para começar, eu nunca havia trabalhado diretamente com duas APIs simultaneamente antes. Essa foi uma experiência
            intrigante, mas também um desafio significativo. Cada API tinha sua própria estrutura de dados, requisitos de
            autenticação e métodos de requisição. Compreender e harmonizar esses dois sistemas distintos exigiu um mergulho
            profundo na documentação de ambas as APIs</p>
        <p>Além disso, o fato de que uma API dependia diretamente dos resultados da outra adicionou uma camada adicional de
            complexidade. Especificamente, uma das APIs fornecia informações de geolocalização, enquanto a outra oferecia previsões
            meteorológicas. Isso significa que, para fornecer uma experiência precisa, eu precisava extrair coordenadas geográficas
            da primeira API e usá-las como entrada para a segunda API.</p>
        <p>A interdependência entre as duas APIs destacou a importância da gestão eficaz de erros e exceções.
            Situações em que uma API não respondia conforme o esperado ou as coordenadas não estavam disponíveis
            requeriam uma abordagem cuidadosa para garantir que o usuário final não fosse impactado negativamente.</p>
        <p>Ao superar esses desafios, aprendi a importância da organização do código e da modularização. Dividir o
            projeto em componentes bem definidos ajudou a manter a clareza e facilitou as futuras atualizações e expansões.</p>
    </div>
</template>
<script>
export default{
    name: 'DesafiosSobre'
}
</script>
<style scoped>
.desafios{
    padding-top: 30px;
    color: #7057bc;
    font-size: 16px;
    text-align: justify;
    font-weight: 400;
    text-indent: 20px;
    line-height: 1.5;
}
</style>