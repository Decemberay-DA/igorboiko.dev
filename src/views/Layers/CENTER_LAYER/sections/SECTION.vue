<template lang="pug">
div(:id="definedSectionID")
	//- name row
	div.flex.flex-row.h-fit.items-center(v-if="sectionTitle")
		.flex-none.w-6
		p.one-line-text.section-pointer(v-if="sectionTitle") {{ sectionTitle }}
		.flex-none.w-6
		div.h-full.w-full.flex.flex-col.content-center 
			.line.line-gradient
			.flex-none.h-2
			div.flex.flex-row
				.line.line-gradient
				.line
		.flex-none.w-6
	div(v-else) 
	slot
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
	sectionTitle: {
		type: String,
		required: false,
	},
	definedSectionID: {
		type: String,
		required: true,
	},
});
</script>

<style lang="scss">
.line {
	@apply h-[2px] w-full;
}
.line-gradient {
	@apply bg-gradient-to-r from-GACTIVE via-GACTIVATABLE to-transparent;
}
.one-line-text {
	@apply w-fit h-fit pointer-events-auto;
	overflow: visible;
	// padding: 0.5rem;
	// line-height: 1.5;
	white-space: nowrap;
}


</style>
