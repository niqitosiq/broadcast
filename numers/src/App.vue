<template>
  <div id="app">
    <alg></alg>

    <vue-ya-metrica :counter="53586229"></vue-ya-metrica>
  </div>
</template>

<script>
import alg from './components/HelloWorld.vue';
import Vue from 'vue';
import VueYaMetrica from 'vue-ya-metrica';

export default {
  name: 'app',
  components: {
    alg,
    VueYaMetrica
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
