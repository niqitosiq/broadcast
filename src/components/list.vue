<template>
  <div class="list">
    <div class="line bb">
      <h1>Список групп</h1>
      <ic v-on:click="modalNew()" class="iconsett" title="Добавить группу" icon="user-plus"></ic>
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
          <span class="clickable"  v-on:click="changeVal(item.id, item.all)">
            {{ item.logined }} / {{ item.all }}
          </span>
          <span>{{ item.testPass }}/{{ item.testCount }}</span>
          <ic class="copy" @click="copy(item.id)" icon="copy"></ic>
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script lang="js">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';
import axios from 'axios';
import VueClipboard from 'v-clipboard';


Vue.use(VueClipboard)


export default {
  data() {
    return {
      groups: {},
      linkloaded: 0,
      chunklink: {},
      moment: moment,
      parent: 0,
    }
  },
  methods: {
    reloadList(){
      let _this = this;
      axios.get(this.$urlget + '/ggroup')
      .then(function(response){
        _this.groups = response.data;
      });
    },
    getGroup(id){
      let _this = this;
      axios.get(this.$urlget + '/gtList', {params: {id: id}})
      .then(function(response){
        _this.chunklink = response.data.data;
        _this.linkloaded =  true;
        _this.parent = id;
        socket.send(JSON.stringify({"action": "connect", "target": id}));
      });
      
    },
    getNormal(from, to){
      return (moment.utc(moment(to).diff(moment(from))).format("HH:mm:ss"));
    },
    modalNew(){
      this.$modal.show('newgroup')
    },
    changeVal(id, old){
      this.$modal.show('editItem', {parent: this.parent, id: id, old: old})
      //axios.get('http://localhost:8456/updateVal', {params: {parent: this.parent, id: id}});
    },
    changeData(data){
      for (var i in data){
        for (var j in this.chunklink){
          if (data[i].id == this.chunklink[j].id){
            this.chunklink[j] = data[i];
            this.$forceUpdate();
          }
        }
      }
    },
    copy(id){
      this.$clipboard(this.$user + "?p=" + this.parent +"&c=" + id);
      this.flash('Ссылка скопирована', 'success');
    }
  },
  mounted() {
    const socket = new WebSocket(this.$urlwss);
    this.reloadList();
    var _this = this;
    socket.onopen = function (evt) {
      socket.send(JSON.stringify({action: "listen"}));
    }
    socket.onmessage = function(msg) {
      var mes = JSON.parse(msg.data);
      switch(mes.status) {
         case "reload":
           _this.changeData(mes.data);
           break;
         case "newgroup":
           _this.reloadList();
           break;
       } (mes.status)
      
    }
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
    >*
      width: 20%
      text-align: center
    .id, .copy
      +fb
      width: 20px
    &:last-child
      border-bottom: none
    svg
      color: #339af0
      cursor: pointer
</style>
<style lang="sass">

</style>
