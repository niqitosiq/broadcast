<template>
  <div class="container">
    <div v-if="loaded==0" class="loader">
      <square-grid background="#339af0"></square-grid>  
      <p>Идёт загрузка, подождите</p>
    </div>
    <div v-else v-html="chunk">
      
    </div>
  </div>
  
</template>

<script>
import {SquareGrid} from 'vue-loading-spinner';
import axios from 'axios';

export default {
  data() {
    return {
      loaded: 0,
      chunk: '<p>Идёт загрузка</p>',
    }
  },
  methods: {
    getHtml(){
      var _this = this;
      axios.get('http://127.0.0.1:8456/getHtml')
      .then(function(response){
        _this.chunk = JSON.parse(response.data).data;
        _this.loaded =  true;
      });
    }
  }, 
  mounted() {
    this.getHtml();
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
</style>
