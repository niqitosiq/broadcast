<template>
  <div class="container">
    <div v-if="loaded==0" class="loader">
      <square-grid background="#339af0"></square-grid>  
      <p>Идёт загрузка, подождите</p>
    </div>
    <div v-else>
      <iframe :src='"http://127.0.0.1:8456/getHtml?" + chunk'></iframe>
    </div>
  </div>
  
</template>

<script>
import {SquareGrid} from 'vue-loading-spinner';
import axios from 'axios';

const socket = new WebSocket("ws://localhost:8085");


export default {
  data() {
    return {
      loaded: true,
      chunk: '',
    }
  },
  methods: {
    getHtml(){
      this.chunk = 'ref=1.html';
    }
  }, 
  mounted() {
    var _this = this;
    socket.onopen = function (evt) {
      socket.send(JSON.stringify({action: "getLink"}));
    }
    socket.onmessage = function(msg) {
      var mes = JSON.parse(msg.data);
      switch(mes.status) {
         case "linkgeted":
           _this.chunk = mes.data;
           break;
       } (mes.status)
      
    }
  },
  components: {
    SquareGrid
  }
}

</script>

<style lang="sass" scoped>
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
  .container>*
    height: 100%
</style>

<style lang="sass">
  html,body
    width: 100%
    height: 100%
</style>
