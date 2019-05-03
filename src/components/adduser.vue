<template>
	<div class="btnwrapper">
		<div v-if="this.$parent.linkloaded">
			<div @click="$parent.changeTicket()" v-bind:class="{ active: this.$parent.isTicket }" class="hotset button">Пропуск
				<ic icon="power-off"></ic>
			</div>
	        <div @click="$parent.changeCheck()" v-bind:class="{ active: this.$parent.isCheck }" class="hotset button">
	        	Присутствие
	        	<ic icon="power-off"></ic>
	        </div>	
			<downloadExcel :data="this.$parent.chunklink" :fields = "fields" class="button secondary">Скачать excel</downloadExcel>
		    <ic v-on:click="modalNew('delete')" class="iconsett red" icon="trash-alt"></ic>
		    <ic v-on:click="modalNew('settings')" class="iconsett" icon="user-cog"></ic>
	    </div>
	    <div>
		    
		    <ic v-on:click="modalNew('newgroup')" class="iconsett" title="Добавить группу" icon="user-plus"></ic>
	    </div>
	</div>
</template>
<script>

import Vue from 'vue';
import JsonExcel from 'vue-json-excel';
import moment from 'moment';
Vue.component('downloadExcel', JsonExcel);

export default {
	data(){
		return {
			fields: {
				'Статус': 'status',
	            'Айди': 'id',
	            'Время первого запроса': {
	            	field: 'timefrom',
	            	callback: (value) => {
	            		return moment(value).format('DD.MM.YYYY HH:mm:ss');
	            	}
	            },
	            'Время разрыва': {
	            	field: 'timeto',
	            	callback: (value) => {
	            		return moment(value).format('DD.MM.YYYY HH:mm:ss');
	            	}
	            },
	            'Сумма времени сессий': 'texttotal',
	            'Количество тестов': 'twestCount',
	            'Пройдено тестов': 'testPass',
	            'Сейчас онлайн': 'logined',
	            'Возможный онлайн': 'all',
			}
		}
	},
	methods: {
	    modalNew(name){
	      this.$modal.show(name, {parent: this.$parent.parent});
	    }
	}
}

</script>

<style lang="sass"> 
	.btnwrapper
		+flexbox(center, space-between)
	.btnwrapper>div 
		margin-right: 30px
		&:last-child
			margin-right: 0
		>*
			margin-right: 30px
			&:last-child
				margin-right: 0
	
	.button.hotset 
		color: #c72121
		background: transparent
		border: solid 1px #c72121
		&:hover
			background: transparent
		svg
			margin-left: 10px
		&.active
			color: #21c73e
			background: transparent
			border: solid 1px #21c73e
</style>
<style lang="sass"> 
	.btnwrapper .button
		flex-shrink: 0
		padding-right: 20px!important
		padding-left: 20px!important
		display: inline-block
</style>
