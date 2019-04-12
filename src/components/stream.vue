<template>
  <div>
  	<p>ривет это я никита</p>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import axios from 'axios';



export default {
  data() {
    return {
    	activePopup: 0,
    	popupid: 0,
    	groupname: "",
    	iter: null,
    };
  },
  methods: {
    addNewGroup() {
    	let _this = this;
		axios.get('http://127.0.0.1:8456/dgroup', {params: {name: this.groupname, iter: this.iter}})
		.then(function(){
			_this.activePopup=0;
		});

    },
    openpopup(id){
    	this.activePopup = 1;
    	popupid = id;
    }
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
	+flexbox(center, space-between)
.iconsett
	font-size: 20px
	color: #339af0
	cursor: pointer
.popup
	position: fixed
	width: 100%
	height: 100%
	left: 0px
	top: 0px
	background: #00000080
	opacity: 0
	transition: opacity cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s
	pointer-events: none
	+flexbox(flex-start, center)
	z-index: 10
	padding-top: 50px
	&.active
		opacity: 1
		pointer-events: auto
	>*
		max-width: 350px
		background: #fff
		padding: 50px 40px
		position: relative
		border-radius: 5px
		h2
			margin-bottom: 20px
			text-align: center
		input
			width: 100%
			height: 50px
			padding-left: 20px
			border: solid 1px #339af050
			transition: border cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s
			margin-bottom: 10px
			border-radius: 5px
			&:focus
				border: solid 1px #339af0
		.close
			font-size: 25px
			position: absolute
			right: 20px
			top: 15px
			cursor: pointer
			transition: color cubic-bezier(0.645, 0.045, 0.355, 1) 0.2s
			&:hover
				color: #339af0
</style>
