<template lang="pug">
IconBase(
:sizepx="sizepx"
:svgPath="'M200 64v104a8 8 0 0 1-16 0V83.31L69.66 197.66a8 8 0 0 1-11.32-11.32L172.69 72H88a8 8 0 0 1 0-16h104a8 8 0 0 1 8 8'")
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import IconBase from "./_private/IconBase.vue";
const props = defineProps({
	sizepx: {
		type: Number,
		required: false,
		default: 32,
	},
});
</script>
