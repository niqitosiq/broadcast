<template>
  <div id="app">
    <addNew />
    <list/>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import list from './components/list.vue';
import addNew from './components/adduser.vue';

@Component({
  components: {
    list,
    addNew,
  },
})
export default class App extends Vue {}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300i,400,700&amp;subset=cyrillic');
ul
	list-style: none
#app
  +flexbox(start, start, column)
  +fr
  width: 1200px
  margin: 30px auto  
.button
  background: #00000010
  text-align: center
  padding: 15px 0!important
  cursor: pointer

.testform
  margin-top: 40px
  min-width: 120px
  >*
    margin-bottom: 10px
  input
    padding: 15px
    background: #00000001
    border: solid 1px #00000020
    width: 100%
</style>
