<template>
  <div id="app">
    <list/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import list from './components/list.vue';

@Component({
  components: {
    list,
  },
})
export default class App extends Vue {}

</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300i,400,700&amp;subset=cyrillic');
ul
	list-style: none
#app
  +flexbox(start, start)
  +fr
  width: 1200px
  margin: 30px auto
</style>
