<template>
  <div>
    <modal width="400px" overlayTransition="nice-modal-fade" height="auto" name="newgroup" class="newgroup">
		<h2>Добавить группу</h2>
		<input v-model="groupname" placeholder="Название группы" type="text">
		<input v-model="iter" placeholder="Количество ссылок" type="text">
		<input v-model="max" placeholder="Переходов по каждой ссылке" type="text">
		<select @change="tempchange" v-model="temp">
			<option value="" disabled selected>Выберите шаблон</option>

			<option v-for="item in listtemp" :value="item">
				{{ item }}
			</option>
		</select>
		<transition  name="fadeHeight" mode="out-in">
		<textarea v-model="templatehtml" v-if="templatehtml!=null"></textarea>
		</transition>
		<div v-on:click="addNewGroup();" class="button">Создать</div>

    	<ic @click="$modal.hide('newgroup')" class="close" icon="times"></ic>
	</modal>
	<modal width="400px" height="auto" @before-open="getForChange" name="editItem" overlayTransition="nice-modal-fade">
		
		<h3>Изменить максимальное количество переходов по конкретной ссылке</h3>
		<input v-model="old" type="text">
		<div v-on:click="edit();" class="button">Изменить</div>
		<ic @click="$modal.hide('editItem')" class="close" icon="times"></ic>
		<div class="path">Путь: {{ parent }} -> {{ id }}</div>
	</modal>
	<modal width="400px" height="auto" name="delete" @before-open="getParent" overlayTransition="nice-modal-fade">
		<h3>Вы уверены, что хотите удалить эту группу?</h3>
		<div class="btnvert">
			<div v-on:click="deletePar();" class="button">
				Удалить
			</div>
			<div @click="$modal.hide('delete')" class="button secondary">
				Отмена
			</div>
		</div>
	</modal>
	<modal width="400px" height="auto" name="settings" @before-open="getParent" overlayTransition="nice-modal-fade">
		<h3>Настройки группы</h3>
		<div class="sep-group">
			<input placeholder="Переходов в группе" v-model="max" type="text">
			<input placeholder="Интервал проверки присутствия" v-model="interval" type="text">
			<div @click="changeSettings" class="button">Сохранить</div>
		</div>
		<div class="sep-group">
			<h3>Добавить ссылок</h3>
			<input placeholder="Количество ссылок для добавления" v-model="iter" type="text">
			<div @click="addLinks" class="button">
				Добавить
			</div>
		</div>
		
	</modal>
  </div>
</template>

<script lang="js">
	import Vue from 'vue';
	import axios from 'axios';
	import VModal from 'vue-js-modal'
	Vue.use(VModal)


	export default {
		data() {
			return {
				groupname: "",
				iter: null,
				listtemp: [],
				temp: "",
				max: "",
				id: "def",
				parent: "def",
				old: 0,
				interval: null,
				templatehtml: null,
			};
		},
		methods: {
			addNewGroup() {
				let _this = this;
				axios.get(this.$urlget + '/dgroup', {params: {
					name: this.groupname, 
					iter: this.iter,
					temp: this.templatehtml,
					max: this.max
				}})
				.then(function(resp){
					_this.max = null;
					_this.iter = null;
					_this.groupname = null;
					_this.temp = "";
					_this.templatehtml = null;
					if (resp.data.status=="error"){
						_this.flash(resp.data.data, 'error');
						
					} else {
						_this.$modal.hide('newgroup');
					}
				});
			},
			addLinks(){
				let _this = this;
				axios.get(this.$urlget + '/addLinks', {params: {
					parent: this.parent, 
					iter: this.iter
				}}).then(function(response){
					console.log(response.data.status);
					if (response.data.status == "ok"){
						console.log(_this.$parent.$children)
						_this.$parent.$children[0].getGroup("def");
						_this.$parent.$children[0].reloadList();
						_this.$modal.hide('settings')
					}
				})
			},
			changeSettings(){
				let _this = this;
				axios.get(this.$urlget + '/setSettings', {params: {
					parent: this.parent,
					interval: this.interval,
					max: this.max
				}}).then(function(response){
					if (response.data.status == "ok"){
						console.log(_this.$parent.$children);
						_this.$parent.$children[0].getGroup("def");
						_this.$parent.$children[0].reloadList();
						_this.$modal.hide('settings')
					}
				})
			},
			getTemp(){
				let _this = this;
				axios.get(this.$urlget + '/getListOfTemplates')
				.then(function(response){
					_this.listtemp = response.data.data;
				});
			},
			getForChange (event) {
				this.id = event.params.id;
				this.parent = event.params.parent;
				this.old = event.params.old;
			},
			getParent(event){

				this.parent = event.params.parent;
			},
			deletePar(){
				console.log("em")
				var _this = this;
				axios.get(this.$urlget + '/deletegroup', {params: {"parent": this.parent}})
				.then(function(response){
					_this.flash('Успешно удалено', 'success');
					_this.$modal.hide('delete');
					_this.$parent.$children[0].linkloaded = 0;
				});
			},
			edit(){
				let _this = this;
				axios.get(this.$urlget + '/editMax', {params: {
					"parent": this.parent,
					"id": this.id,
					"new": this.old
				}})
				.then(function(response){
					_this.$modal.hide('editItem')
				});
			},
			tempchange(){
				let _this = this;
				axios.get(this.$urlget + '/getHtml', {params: {ref: this.temp}})
				.then(function (resp) {
					_this.templatehtml = resp.data;

				})
				
			}
		},
		mounted() {
			this.getTemp();
		}
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
	+flexbox(center, space-between)
.iconsett
	font-size: 20px
	color: #339af0
	cursor: pointer
	&.red >*
		color: #c72121
.btnvert
	margin-top: 20px
.v--modal-box
	padding: 40px 50px!important
	h2,h3
		margin-bottom: 20px
		text-align: center
	input, select, textarea
		width: 100%
		height: 50px
		padding-left: 20px
		border: solid 1px #339af050
		transition: border cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s
		margin-bottom: 10px
		border-radius: 5px
		&:focus
			border: solid 1px #339af0
	select
		padding-right: 20px
		-webkit-appearance: none
	    -moz-appearance: none
	    appearance: none
	textarea
		padding-top: 10px
		height: 300px
	.close
		font-size: 25px
		position: absolute
		right: 20px
		top: 15px
		cursor: pointer
		transition: color cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s
		&:hover
			color: #339af0
	.path
		font-size: 12px
		width: 100%
		text-align: center
		margin-top: 20px
		color: #969494
.sep-group
	padding-top: 10px
	margin-top: 10px
	padding-bottom: 10px
	margin-bottom: 10px

	&.w50
		width: calc(50% - 10px)
		display: inline-block
		
	&.lst
		margin-left: 20px
	>*
		margin-bottom: 10px
		&:last-child
			margin-bottom: 0
.fadeHeight-enter-active, .fadeHeight-leave-active 
	transition: all 0.25s!important
	max-height: 300px

.fadeHeight-enter, .fadeHeight-leave-to
	opacity: 0
	max-height: 0px

</style>
