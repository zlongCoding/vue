<template>
	<div class="dialog-bg" v-if="dialog"></div>
</template>
<script>
export default {
  name: 'home',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dialog (curVal, oldVal) {
      if (curVal) {
        this.overflowHidden()
      } else {
        this.overflowAuto()
      }
    }
  },
  methods: {
    move (e) {
      e.preventDefault()
    },
    overflowHidden () {
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', this.move, false)
    },
    overflowAuto () {
      document.body.style.overflow = ''
      document.removeEventListener('touchmove', this.move, false)
    }
  }
}
</script>
<style scoped lang="scss">
.dialog-bg{
  position: fixed;
  width:100%;
  height:100%;
  left:0;
  top:0;
  background:#000;
  opacity: .2;
  z-index:99;
}
</style>
