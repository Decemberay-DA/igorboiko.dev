<template lang="pug">
IconBase(
v-if="!isDropped"
:sizepx="sizepx"
:svgPath="'M340.864 149.312a30.59 30.59 0 0 0 0 42.752L652.736 512L340.864 831.872a30.59 30.59 0 0 0 0 42.752a29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z'")
IconBase(
v-if="isDropped"
:sizepx="sizepx"
:svgPath="'M831.872 340.864L512 652.672L192.128 340.864a30.59 30.59 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.59 30.59 0 0 0-42.752 0z'")
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import IconBase from "./_private/IconBase.vue";

const props = defineProps({
	isDropped: {
		type: Boolean,
		required: false,
		default: true,
	},
	sizepx: {
		type: Number,
		required: false,
		default: 32,
	},
});
</script>
