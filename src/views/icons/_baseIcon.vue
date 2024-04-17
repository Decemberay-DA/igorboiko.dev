<template lang="pug">
div.icon
	//- div(:id="definedSectionID")
		svg(xmlns="http://www.w3.org/2000/svg" 
		:width="sizepx" 
		:height="sizepx" 
		viewBox="0 0 #{sizepx} #{sizepx}")
			path(:d="path")
			
	svg(:width="sizepx" :height="sizepx" viewBox="0 0 24 24")
		path(:d="svgPath")

</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
	sizepx: {
		type: Number,
		required: false,
		default: 16,
	},
	svgPath: {
		type: String,
		required: true,
	},
});
</script>

<style scoped lang="scss">
.icon {
	height: 14px;
	width: 14px;
}
</style>
