<template lang="pug">
div.unreachable-section(:id="definedSectionID")
    slot
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
	definedSectionID: {
		type: String,
		required: true,
	},
});
</script>

<style lang="scss">
.unreachable-section {
	@apply invisible h-0 w-0;
}
</style>
