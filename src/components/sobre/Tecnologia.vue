<template>
    <div class="tecnologia">
        <p>O Vue.js, um framework reativo que inicialmente se apresentou como um desafio,
            rapidamente se tornou a espinha dorsal da minha criação. Sua abordagem baseada em
            componentes permitiu-me dividir a complexidade do projeto em partes gerenciáveis,
            melhorando a organização do código e a reutilização de elementos de interface. A ligação
            dinâmica de dados do Vue.js introduziu uma nova camada de interatividade, permitindo
            que as informações climáticas fluíssem sem esforço através da interface do usuário.</p>
        <p>Para acessar os dados das APIs de geolocalização e previsão do tempo, recorri ao Axios.
            Essa biblioteca HTTP simplificou significativamente o processo de fazer requisições e receber
            respostas, agilizando a integração das informações necessárias para a plataforma. Através do Axios,
            fui capaz de buscar dados de forma eficiente, tratando erros e garantindo uma experiência confiável
            para os usuários.</p>
        <p>Além disso, a inclusão do Unorm demonstrou meu compromisso em manter o código limpo e organizado.
            Essa biblioteca de normalização auxiliou na estruturação dos dados provenientes das APIs, permitindo
            que eu os manipulasse de maneira coerente e coesa. Isso não apenas aprimorou a qualidade da exibição
            das informações, mas também simplificou a lógica subjacente.</p>
    </div>
</template>
<script>
export default{
    name: 'tecnologiaSobre'
}
</script>
<style scoped>
.tecnologia{
    padding-top: 20px;
    color: #a88cff;
    font-size: 16px;
    text-align: justify;
    font-weight: 400;
    text-indent: 20px;
    line-height: 1.5;
}
</style>