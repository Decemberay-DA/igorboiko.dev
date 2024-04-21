<template lang="pug">
div.w-full.h-full.flex.flex-col(:id="definedSectionID")
	//- name row
	div.flex.flex-row.h-fit.items-center(v-if="sectionTitle")
		.flex-none.w-6
		p.one-line-text.section-pointer(v-if="sectionTitle") {{ sectionTitle }}
		.flex-none.w-6
		div.h-full.w-full.flex.flex-col.content-center 
			.line.line-gradient
			.flex-none.h-2
			div.flex.flex-row
				//- .line.invisible.w-6
				.line.line-gradient--right
				.line.invisible
		.flex-none.w-6
	//- inner section content
	div.w-full.flex.flex-row.content-center.justify-center
		div(class="w-5/6")
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

<style scoped lang="scss">
@import "@/styles/global.scss";

.line {
	@apply h-[2px] w-full;
}
.line-gradient {
	@apply bg-gradient-to-r from-GACTIVE via-GACTIVEABLE to-transparent;

	&--right {
		@apply bg-gradient-to-r from-GACTIVERIGHT via-GWHITE to-transparent;
	}
}
</style>
