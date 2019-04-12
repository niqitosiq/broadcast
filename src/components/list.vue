<template>
  <div class="list">
    <div class="line bb">
      <h1>Список групп</h1>
      <addNew />
    </div>
    <div class="table">
      <ul class="groups">
        <div v-if="groups.data.groups.length!=0">
          <li v-on:click="getGroup(item.id)" v-for="item in groups.data.groups">
            <div class="dataholder">
              <div class="id">{{ item.id }}</div>
              <div class="count">Количество: {{ item.count }}</div>
            </div>
            <div class="name">{{ item.name }}</div>
            
            <ic class="icon" icon="chevron-right"></ic>
          </li>
        </div>
        <div v-else>
          <li>
            Нет ещё ни одной группы
          </li>
        </div>
      </ul>
      <ul class="links">

        <div class="load" v-if="linkloaded==0">
          <ic icon="columns"></ic>
          <h2>
            Сначала выберите группу
          </h2>
        </div>
        <li v-for="item in chunklink" v-else class="list">
          <span class="id">{{item.id}}</span>
          <span v-if="item.timeto==0" class="clickable">
            {{ moment(item.timefrom).format('DD.MM.YYYY HH:mm:ss') }}
          </span>
          <span v-else>
            {{ getNormal(item.timefrom, item.timeto) }}
          </span>
          <span>
            {{ moment(item.last).format('DD.MM.YYYY HH:mm:ss') }}
          </span>
          <span v-on:click="stat()">{{ item.testPass }}/{{ item.testCount }}</span>
          <ic v-bind:class="{active: item.status==1}" icon="mouse-pointer"></ic>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script lang="js">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import axios from 'axios';
import addNew from '@/components/adduser.vue';


Vue.component('addNew', addNew)

const socket = new WebSocket("ws://localhost:8080");



export default {
  data() {
    return {
      groups: null,
      linkloaded: 0,
      chunklink: null,
      moment: moment
    }
  },
  methods: {
    reloadList(){
      let _this = this;
      axios.get('http://127.0.0.1:8456/ggroup')
      .then(function(response){
        _this.groups = response.data;
      });
    },
    getGroup(id){
      let _this = this;
      axios.get('http://127.0.0.1:8456/gtList', {params: {id: id}})
      .then(function(response){
        _this.chunklink = response.data.data;
        _this.linkloaded =  true;
      });
      
    }
  },
  mounted() {
    this.reloadList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.list
	width: 100%
.bb
  border-bottom: solid 1px rgba(51, 154, 240, 0.5)
  padding-bottom: 20px

h1
  width: auto
  display: inline-block
.table
  margin-top: 20px
  +flexbox(flex-start, flex-start)
.groups
  width: 300px
  border: solid 1px rgba(51, 154, 240, 0.5)
  border-radius: 5px
  overflow: hidden
  flex-shrink: 0
  li
    border-bottom: solid 1px rgba(51, 154, 240, 0.5)
    padding: 10px 20px 15px 20px
    background: #fff
    transition: background cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s, color cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s
    cursor: pointer
    position: relative
    .icon
      position: absolute
      right: 20px
      bottom: 20px
      opacity: 0
      color: white
      transition: opacity cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s
    &:hover
      background: #339af0
      color: white
      .icon
        opacity: 1
    &:last-child
      border-bottom: none
    .dataholder
      +flexbox(flex-start, space-between)
    .name
      margin-top: 10px
    .id
      +fb
.links
  width: 100%
  border: solid 1px rgba(51, 154, 240, 0.5)
  margin-left: 20px
  border-radius: 5px
  overflow: hidden
  padding: 20px 00px
  .load
    width: 100%
    height: 100%
    margin-top: 50px
    +flexbox(center, center, column)
    color: #339af0
    h2
      margin-top: 10px
    svg
      font-size: 50px
  .list
    width: 100%
    +flexbox(flex-start, space-between)
    padding: 20px 30px
    border-bottom: solid 1px rgba(51, 154, 240, 0.5)
    .id
      +fb
    &:last-child
      border-bottom: none
    svg
      color: #f98787
    svg.active
      color: #87f998
</style>
<style lang="sass">

</style>
