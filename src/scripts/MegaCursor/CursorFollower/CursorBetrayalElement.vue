<template>
	<div id="cursor_betreyal_backgroundStar.f1d545ae-f58e-4746-998a-243effeb900c" class="base">
		<div class="vertical child -translate-y-1/2"></div>
		<!-- <div class="relative w-4 h-4 flex-none origin-center bg-green-500"></div> -->
		<div class="horizontal child -translate-x-1/2 translate-y-1/2"></div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.base {
	@apply pointer-events-none z-50 absolute flex-none origin-center -translate-x-1/2 -translate-y-1/2;
}
.child {
	@apply relative flex-none bg-green-500 origin-center pointer-events-none;
}
.vertical {
	@apply w-2 h-48 pointer-events-none;
}
.horizontal {
	@apply w-48 h-2 pointer-events-none;
}
</style>
