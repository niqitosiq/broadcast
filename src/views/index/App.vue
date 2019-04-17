<template>
  <div class="container">
    <div v-if="loaded==0" class="loader">
      <square-grid background="#339af0"></square-grid>  
      <p>Идёт загрузка, подождите</p>
    </div>
    <div v-else>
      <iframe v-if="chunk!=''" :src='"http://37.140.195.53:8456/getHtml?" + chunk'></iframe>
    </div>
    <v-dialog @before-open="setTime()"/>
  </div>
</template>

<script>
import Vue from 'vue';
import {SquareGrid} from 'vue-loading-spinner';
import axios from 'axios';
import extract from 'query-parameters';
import VModal from 'vue-js-modal';
Vue.use(VModal, { dialog: true })

const socket = new WebSocket("ws://localhost:1051");


export default {
  data() {
    return {
      loaded: true,
      chunk: '',
    }
  },
  methods: {
    leaving(){
      console.log('a');
      socket.send(JSON.stringify({
        "action": "disconnect"
      }))
    },
  }, 
  mounted() {
    var _this = this;
    console.log();
    socket.onopen = function (evt) {
      socket.send(JSON.stringify({action: "getLink", 
        p: extract(window.location.href).p,
        c: extract(window.location.href).c 
      }));
    }
    socket.onmessage = function(msg) {
      var mes = JSON.parse(msg.data);
      console.log(mes.status)
      switch(mes.status) {
         case "linkgeted":
            _this.chunk = mes.data;
           break;
        case "error":
          _this.$modal.show('dialog', {
              title: 'Произошла ошибка',
              text: mes.data,
              buttons: [
                {
                  title: 'Ok',
                  default: true,
                }
              ]})
          break;
        case "check":
          _this.$modal.show('dialog', {
            title: 'Подвердите присутствовие.',
            text: 'Нажмите на "Ок", если вы на месте',
            buttons: [
              {
                title: 'Ok',
                default: true,
                handler: () => {
                  _this.$modal.hide('dialog');
                  socket.send(
                    JSON.stringify({"action": "check-update"})
                  );
                }

              }
           ],

          })
          setTimeout(function(){_this.$modal.hide('dialog');}, 4000);
          break;
       } (mes.status)
    };
    
  },
  components: {
    SquareGrid
  },
  created(){
    window.onbeforeunload = function(){
      socket.send(JSON.stringify({
        "action": "disconnect"
      }));
    }
  }
}

</script>

<style lang="sass" scoped>
  *
    +fr
  .loader 
    width: 100%
    min-height: 100vh
    +flexbox(center, center, column)
    p
      +fr
      margin-top: 30px
    >.spinner 
      width: 100px!important
      height: 100px!important
  iframe, .container
    width: 100%
    height: 100%
  .container, .container>*
    height: 100%
  body
    width: 100%

    height: 100%
</style>

<style lang="sass">
  html,body
    width: 100%
    height: 100%
    overflow: hidden!important
</style>
