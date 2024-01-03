<template>
    <h2>{{ errorMsg }}</h2>
</template>
<script>
export default{
    name: 'errorBox',
    props:{
        errorMsg: String,
    }
}
</script>
<style>

</style>