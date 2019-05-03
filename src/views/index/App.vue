<template>
  <div class="container">
    <div v-if="loaded==0" class="loader">
      <square-grid background="#339af0"></square-grid>  
      <p>Идёт загрузка, подождите</p>
    </div>
    <div v-else>
      <iframe v-if="chunk!=''" :src='"http://37.140.195.53:8456/getIfr?" + chunk'></iframe>
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
import CryptoJS from "crypto-js";
import moment from 'moment';
Vue.use(VModal, { dialog: true })

const socket = new WebSocket("ws://37.140.195.53:1051");


export default {
  data() {
    return {
      loaded: false,
      chunk: '',
      moment: moment,
      start: "",
      total: "",
    }
  },
  methods: {
    leaving(){
      console.log('a');
      socket.send(JSON.stringify({
        "action": "disconnect",
      }))
    },
    getNormal(from, to){
      return (moment(to).diff(moment(from)));
    },
  }, 
  mounted() {
    this.start = moment().format();

    var  _this = this;
    console.log(extract(window.location.href).link)
    let link = JSON.parse(CryptoJS.AES.decrypt(extract(window.location.href).link, "broadcastsecret").toString(CryptoJS.enc.Utf8));
    socket.onopen = function (evt) {
        socket.send(
          JSON.stringify({action: "getLink", p: link.p, c: link.c})
        );
    }
    socket.onmessage = function(msg) {
      var mes = JSON.parse(msg.data);
      console.log(mes.status)
      switch(mes.status) {
         case "linkgeted":
            _this.chunk = mes.data;
            _this.loaded = true;
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
    
    var _this = this;
    window.onbeforeunload = function(){
      var total = _this.getNormal(_this.start, moment().format())
      socket.send(JSON.stringify({
        "action": "disconnect",
        "lasttime": total,
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
