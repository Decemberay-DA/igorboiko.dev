<template>
	<div id="cursor_betreyal_foregroundStar.f1d525ae-f58e-4746-998a-243effeb900c" class="base">
		<div class="vertical child -translate-y-1/2"></div>
		<div class="relative w-2 h-2 flex-none origin-center bg-red-500"></div>
		<div class="horizontal child -translate-x-1/2 translate-y-1/2"></div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.base {
	@apply pointer-events-none z-50 absolute flex-none origin-center -translate-x-1/2 -translate-y-1/2;
}
.child {
	@apply relative flex-none bg-yellow-400 origin-center pointer-events-none;
}
.vertical {
	@apply w-2 h-12 pointer-events-none;
}
.horizontal {
	@apply w-12 h-2 pointer-events-none;
}
</style>
