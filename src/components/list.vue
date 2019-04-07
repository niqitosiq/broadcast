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
    		Просмотр с
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
    	<li class="listitems" v-for="item in allData">
    		<span>{{ item.name }}</span>
    		<span>{{ item.link }}</span>
    		<span>{{ item.timefrom }}</span>
    		<span>{{ item.last }}</span>
    		<span class="clickable" v-on:click="stat()">{{ item.geted }}/{{ item.from }}</span>
    		<span v-if="item.status==1">Онлайн</span>
    		<span v-else>Офлайн</span>
    	</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
	data() {
		return {
			allData: [
				{"name": "Никита", "link": "213", "timefrom": "15:24", "last": "12:45", "geted": "12", "from": "20", "status": "1"},
				{"name": "Витя", "link": "51512", "timefrom": "132:24", "last": "232:45", "geted": "6472", "from": "24550", "status": "0"},
				{"name": "Коля", "link": "32323232", "timefrom": "1665:24", "last": "12:466665", "geted": "16662", "from": "2660", "status": "0"},
				{"name": "Женя", "link": "221313231213", "timefrom": "15:25554", "last": "12:455555", "geted": "15552", "from": "20", "status": "1"},

			],
			counter: 0
		}
	},
	methods: {
		stat(){
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
		padding: 15px 0
		&.clickable
			cursor: pointer
</style>
