<template>
    <div class="loading-dot"> <!-- Credits: https://codepen.io/redlabor/pen/nzwPGv -->
        <h2>Carregando</h2>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>
<script>
export default{
  name: 'loaderBox'
}
</script>
<style>
/*
 * Baseline styles
 */
 /* body {
  background: #222;
  text-align: center;
  padding: 20%;
} */
.loading-dot h2 {
  color: #ccc;
  margin: 0;
  font: .8em verdana;
  text-transform: uppercase;
  letter-spacing: .1em;
}

/*
 * Loading Dots
 * Can we use pseudo elements here instead :after?
 */
.loading-dot span {
  display: inline-block;
  vertical-align: middle;
  width: .6em;
  height: .6em;
  margin: .19em;
  background: #1d3aba;
  border-radius: .6em;
  animation: loading 1s infinite alternate;
}

/*
 * Dots Colors
 * Smarter targeting vs nth-of-type?
 */
.loading-dot span:nth-of-type(2) {
  background: #213cbf;
  animation-delay: 0.2s;
}
.loading-dot span:nth-of-type(3) {
  background: #2d38be;
  animation-delay: 0.4s;
}
.loading-dot span:nth-of-type(4) {
  background: #3730ba;
  animation-delay: 0.6s;
}
.loading-dot span:nth-of-type(5) {
  background: #4832b8;
  animation-delay: 0.8s;
}
.loading-dot span:nth-of-type(6) {
  background: #481eae;
  animation-delay: 1.0s;
}
.loading-dot span:nth-of-type(7) {
  background: #5212a7;
  animation-delay: 1.2s;
}

/*
 * Animation keyframes
 * Use transition opacity instead of keyframes?
 */
@keyframes loading {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>