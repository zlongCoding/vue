<template>
	<div class="_loading">{{content}}</div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      dd: 'daa'
    }
  },
  props: {
    content: {
      type: String,
      default: ''
    }
  }
}
</script>
<style  lang="scss">
._loading{
	position: absolute;
	left:50%;
	top:50%;
  display: table;
	transform:translate(-50%);
  -webkit-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
  -o-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
	width: auto;
	height: auto;
	background: #000;
	color:#fff;
	padding: 10px;
	border-radius:8px;
  z-index:9999;
}

</style>
