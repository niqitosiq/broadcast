<template>
  <div class="list">
  	<div class="line">
	  	<div class="testform">
	    	<h2>Добавить пользователя</h2>
		    <input v-model="tosend" type="text">
		    <div class="button" v-on:click="addNewUser()">Отправить</div>
	    </div>
    </div>
    <div class="line">
	  	<div class="testform">
			<h2>ID</h2>
			<input v-model="id" type="text">
		</div>
	    
	    <div class="testform">
	    	<h2>статус</h2>
		    <input v-model="to" type="text">
		    <div class="button" v-on:click="changeStatus()">Отправить</div>
	    </div>
	    <div class="testform">
	    	<h2>+потдверждение</h2>
		    <div class="button" v-on:click="addval()">Отправить</div>
	    </div>
	    <div class="testform">
	    	<h2>+к выполнению</h2>
		    <div class="button" v-on:click="addsuc()">Отправить</div>
	    </div>
	    <div class="testform">
	    	<h2>+ время</h2>
		    <div class="button" v-on:click="newtime()">Отправить</div>
	    </div>
	</div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import axios from 'axios';
export default {
  data() {
    return {
      to: '',
      tosend: '',
      id: '',
    };
  },
  methods: {
    addNewUser() {
      axios.get('http://127.0.0.1:8456/newuser', {params: {name: this.tosend}});
    },
    changeStatus() {
      axios.get('http://127.0.0.1:8456/changest',  {params: {id: this.id, to: this.to}});
    },
    addval() {
      axios.get('http://127.0.0.1:8456/addval',  {params: {id: this.id}});
    },
    addsuc() {
      axios.get('http://127.0.0.1:8456/addsuc',  {params: {id: this.id}});
    },
    newtime(){
      axios.get('http://127.0.0.1:8456/settime',  {params: {id: this.id}});
    },
  },
};
</script>

<style lang="sass">
.testform
	display: inline-block
	margin-right: 20px
	width: auto
	text-align: center
.line
	display: block
	width: 100%
	+flexbox(flex-start, space-between)
.list
	width: 100%
</style>
