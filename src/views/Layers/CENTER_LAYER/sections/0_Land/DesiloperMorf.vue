<template lang="pug">
div.Base
    h1.Left DESIGNER
    h1.Right DEVELOPER
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.Base {
	@apply relative h-[250px] w-fit;
}

.___meta {
	font-size: 180px;
	font-weight: 800;
	letter-spacing: 0;
	line-height: 194.4px;
	text-align: center;
	white-space: nowrap;
	font-family: "Montserrat-ExtraBold", Helvetica;
	height: 194px;
}

.Left {
	@apply ___meta;
	@apply absolute text-GACTIVELEFT mix-blend-screen;
	left: 0;
	top: 14px;
}

.Right {
	@apply ___meta;
	@apply absolute text-GACTIVERIGHT mix-blend-screen h-[200px];
	left: 14px;
	top: 0;
}
</style>
