<template>
<div id="app">
  <transition name="fade" mode="out-in" appear>
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
export default {
  name: 'app',
  components: {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  /*position: absolute;
*/
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}
</style>
