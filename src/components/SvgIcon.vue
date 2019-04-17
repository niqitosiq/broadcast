<template>
  <div>
</div>
</template>

<script>
export default {
  name: 'svg-icon',

  props: {
    name: {
      type: String,
      required: true
    },

    title: {
      type: String,
      default: null
    }
  },

  computed: {
    iconPath() {
      return require(`@/assets/icons/${this.name}.svg`).default.url;
    },

    className() {
      return 'svg-icon svg-icon--' + this.name;
    }
  }
};
</script>

<style>
  .svg-icon {
    fill: currentColor;
    height: 24px;
    width: 24px;
  }
</style>
