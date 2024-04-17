<template lang="pug">
div.LAYER-fixed(
	:id="definedLayerID" 
	:class="isScrollable ? 'LAYER-scrollable' : 'LAYER-fixed'")
	slot
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
	definedLayerID: {
		type: String,
		required: true,
	},
	isScrollable: {
		type: Boolean,
		required: false,
		default: false,
	},
});
</script>

<style lang="scss">
.LAYER-fixed {
	@apply fixed inset-0;
}
.LAYER-scrollable {
	@apply relative;
}
</style>
