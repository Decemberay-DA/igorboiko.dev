<template lang="pug">
.Base
    .Designer DESIGNER
    .Developer DEVELOPER
</template>

<script setup lang="ts"></script>

<style lang="scss">
.Base {
	@apply relative h-[250px] w-fit;
}

.Designer {
	@apply absolute text-GACTIVELEFT mix-blend-screen;
	font-family: "Montserrat-ExtraBold", Helvetica;
	font-size: 180px;
	font-weight: 800;
	height: 194px;
	left: 0;
	letter-spacing: 0;
	line-height: 194.4px;
	text-align: center;
	top: 14px;
	white-space: nowrap;
}

.Developer {
	@apply absolute text-GACTIVERIGHT mix-blend-screen h-[200px];
	font-family: "Montserrat-ExtraBold", Helvetica;
	font-size: 180px;
	font-weight: 800;
	left: 14px;
	letter-spacing: 0;
	line-height: 194.4px;
	text-align: center;
	top: 0;
	white-space: nowrap;
}
</style>
