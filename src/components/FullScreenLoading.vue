<template>
<div class="_fsLoading" :class="fullbg ? 'full' : ''">
	<span class="_loading"></span>
</div>
</template>

<script>
export default {
  props: ['fullbg']
}
</script>

<style  lang="scss" scoped>
._fsLoading {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.27);

		&.full {
			background: #fff;
		}
    ._loading {
        display: block;
        background: url("../assets/images/loading.svg") center center no-repeat #fff;
        width: 50px;
        height: 50px;
        border-radius: 4px;
        background-size: 30px 30px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -25px 0 0 -25px;
    }
}
</style>
