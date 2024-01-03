<template>
    <div class="banner">
        <div class="box-size">
            <div class="slogan">
                <span>Verifique como está o tempo em sua cidade.</span>
            </div>
            
            <div class="warning">
                <span>*Apenas estados Brasileiros.</span><br>
                <span>Comece inserindo seu estado e selecione da lista</span>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style scoped>
@font-face {
    font-family: 'Courgette';
    src: url('../../assets/fonts/Courgette-Regular.ttf');
}
.banner{
    margin: 0 auto;
}
.box-size{
    width: 100%;
    margin: 0 auto;
    max-width: 500px;
}
.box-size .warning{
    margin: 1% 0;
}
.box-size .warning span{
    color: #04CBF9;
    font-size: 16px;
}
.box-padding{
    /* background-color: red; */
    position: relative;
    padding-top: calc((9/16) * 100%);
}
.box-img{
    position:absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.box-img img{
    object-fit: contain;
    width: 100%;
    height: 100%;
}
.slogan{
    padding: 2% 0;
    margin: 0 auto;
    max-width: 420px;
    width:100%;
    text-align: center;
}
.slogan span{
    font-family: 'Courgette', sans-serif;
    color: aliceblue;
    font-size: 48px;
}
@media screen and (max-width: 480px) {
    .slogan{
        max-width: 340px;
    }
    .slogan span{
    font-family: 'Courgette', sans-serif;
    color: aliceblue;
    font-size: 36px;
}
}
</style>