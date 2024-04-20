<template lang="pug">
p(@click="scroll")
	span.num(class="p") 0{{ number  }}. 
	span.txt(class="p", id="INTRO_SECTION-header") {{ title }}
</template>

<script setup lang="ts">
import PageScrollH from "@/scripts/VueTSHelper/PageScrollH";
import { defineProps } from "vue";

const scroll = () => PageScrollH.scrollToHTMLElement(props.scrollToSectionElement);

const props = defineProps({
	number: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	scrollToSectionElement: {
		type: HTMLElement,
		required: true,
	},
});
</script>

<style scoped lang="scss">
.txt {
	@apply text-GWHITE pointer-events-auto cursor-pointer;
	transition: color 0.3s ease-in-out;

	&__current {
		@apply text-GACTIVE;
	}

	&:hover {
		@apply text-GACTIVE;
	}
}
.num {
	@apply w-fit h-fit pointer-events-auto;
	overflow: visible;
	padding: 0.5rem;
	line-height: 1.5;
	white-space: nowrap;

	@apply text-GACTIVE;
}
</style>
