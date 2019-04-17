<template>
  <div id="app">
    <div class="cont">
      <list/>
      <modals />
    </div>
    <div class="mescont">
      <flash-message transitionName="nice-modal-fade"/>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import list from '@/components/list.vue';
import modals from '@/components/modals.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserPlus, faTimes, faChevronRight, faColumns, faMousePointer, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueGlobalVariable from 'vue-global-var';


import VueFlashMessage from 'vue-flash-message';
Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 700,
  }
});
require('vue-flash-message/dist/vue-flash-message.min.css');

import VModal from 'vue-js-modal';
Vue.use(VModal);

Vue.component('ic', FontAwesomeIcon)
Vue.config.productionTip = false

Vue.use(VueGlobalVariable, {
  globals: {
    urlget: "http://localhost:8456",
    urlwss: 'ws://localhost:1050/',
    user: "http://localhost:8081/",
  }
})

@Component({
  components: {
    list,
    modals
    
  },
})
export default class App extends Vue {
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300i,400,700&amp;subset=cyrillic');
ul
  list-style: none
#app
  +fr
#app>.cont
  +flexbox(start, start, column)
  
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
.mescont
  position: fixed
  right: 30px
  bottom: 30px
  z-index: 1000
</style>
