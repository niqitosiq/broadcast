<template>
	<div class="btnwrapper">
		<downloadExcel :data="this.$parent.chunklink" :fields = "fields" v-if="this.$parent.linkloaded" class="button secondary">Скачать excel</downloadExcel>
	    <ic v-if="this.$parent.linkloaded" v-on:click="modalNew('delete')" class="iconsett red" icon="trash-alt"></ic>
	    <ic v-if="this.$parent.linkloaded" v-on:click="modalNew('settings')" class="iconsett" icon="user-cog"></ic>
	    <ic v-on:click="modalNew('newgroup')" class="iconsett" title="Добавить группу" icon="user-plus"></ic>
	</div>
</template>
<script>

import Vue from 'vue'
import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)

export default {
	data(){
		return {
			fields: {
				'Статус': 'status',
	            'Айди': 'id',
	            'Время Начала': 'timefrom',
	            'Время Конца': 'timeto',
	            'Количество тестов': 'testCount',
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
	.btnwrapper >*
		margin-right: 30px
		&:last-child
			margin-right: 0
	

</style>
<style lang="sass"> 
	.btnwrapper .button
		flex-shrink: 0
		padding-right: 20px!important
		padding-left: 20px!important
		display: inline-block
</style>
