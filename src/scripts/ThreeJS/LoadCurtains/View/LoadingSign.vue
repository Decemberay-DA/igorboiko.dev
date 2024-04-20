<template lang="pug">
div(id="__LoadCurtain__")
    div.w-6.h-6.bg-yellow-500.animate-spin
</template>

<script setup lang="ts"></script>

<style lang="scss">
@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

.animate-spin {
	animation: spin 2s linear infinite;
}
</style>
