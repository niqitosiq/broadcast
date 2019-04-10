<template>
  <div class="list">
    <h1>Список зрителей</h1>
    <ul class="head">
    	<li class="name">
    		Имя
    	</li>
    	<li>
    		Ссылка
    	</li>
    	<li>
    		Время (c) просмотра
    	</li>
    	<li>
    		Последнее подтверждение
    	</li>
    	<li>
    		Выполнено
    	</li>
    	<li>
    		Статус
    	</li>
    </ul>
    
    <ul>
    	<li class="listitems" v-for="item in allData.users">
    		<span>{{ item.name }}</span>
    		<span>{{ item.id }}</span>
    		<span v-if="item.timeto==0" class="clickable">
    			{{ moment(item.timefrom).format('DD.MM.YYYY HH:mm:ss') }}
    		</span>
    		<span v-else>
    			{{ getNormal(item.timefrom, item.timeto) }}
    		</span>
    		<span>
    			{{ moment(item.last).format('DD.MM.YYYY HH:mm:ss') }}
    		</span>
    		<span class="clickable" v-on:click="stat()">{{ item.testPass }}/{{ item.testCount }}</span>
    		<span v-if="item.status==1">Онлайн</span>
    		<span v-else>Офлайн</span>
    		<div class="settings">
    			
    		</div>
    	</li>
    </ul>

    <!-- 
    <div class="testform">
    	<h2>
    		Проверка связи с сокетом
    	</h2>
	    <input v-model="tosend" type="text">
	    <div class="button" v-on:click="sendwss()">Отправить</div>
    </div>
	-->
    
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import moment from 'moment';
import axios from 'axios';

const socket = new WebSocket("ws://localhost:8080");



export default {
  data() {
    return {
      allData: {loading: "load"},
      counter: 0,
      moment,
      tosend: 0,
      date: "24.05.2001"
    }
  },
  methods: {
    getNormal(from, to){
      return (moment.utc(moment(to).diff(moment(from))).format("HH:mm:ss"));
    },
    sendwss() {
      socket.send(this.tosend)
    },
    reloadList() {
      axios.get('http://localhost:8456/getall').then((response) => {
        this.allData = response.data;
      })
    },
    change(toch) {
      this.allData = toch;
      this.$forceUpdate();
    },
    changeData(data) {
      let stateData = this.allData;
      let parsed = JSON.parse(data);
      console.log(data);
      for (let i in parsed) {
        let idchange = parsed[i].id;
        for (let j in stateData.users) {
          let dataid = stateData.users[j].id;
          if (dataid == idchange) {
            stateData.users[j] = parsed[i];
            parsed.slice(i, 1);
          }
        }
      }
      if (parsed.length>0) {
        for (let i in parsed) {
          stateData.users[((parsed[i].id) + 1)] = parsed[i];
        }
      }
      this.change(stateData);
    }
  },
  mounted() {
    this.reloadList();
    const _this = this;
    socket.onopen = function (evt) {
      socket.send(JSON.stringify({action: "listen"}));
    }
    socket.onmessage = function(msg) {
      _this.changeData(msg.data);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.list
	width: 100%
.head li
	width: calc(100% / 6)
	text-align: center
.head
	width: 100%
	+flexbox(flex-start, flex-start)
	padding: 20px 0
	background: #f2e1bb
	margin-top: 40px
	margin-bottom: 20px
.listitems
	width: 100%
	+flexbox(flex-start, flex-start)
	border: solid 1px #fff
	transition: border ease-in-out 0.2s
	&:hover
		border: solid 1px #f2e1bb
	span
		width: calc(100% / 6)
		text-align: center
		padding: 15px
		&.clickable
			cursor: pointer

</style>
<style lang="sass">

</style>
