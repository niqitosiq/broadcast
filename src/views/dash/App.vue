<template>
  <div id="app">
    <list/>
    <modals />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import list from '@/components/list.vue';
import modals from '@/components/modals.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus, faTimes, faChevronRight, faColumns, faMousePointer, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import VModal from 'vue-js-modal';
Vue.use(VModal)

Vue.component('ic', FontAwesomeIcon)
Vue.config.productionTip = false



@Component({
  components: {
    list,
    modals
    
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
  background: #339af0
  text-align: center
  padding: 15px 0!important
  cursor: pointer
  color: white
  border-radius: 5px
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
.clickable
  cursor: pointer
</style>
