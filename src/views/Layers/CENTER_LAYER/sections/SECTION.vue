<template lang="pug">
div(:id="definedSectionID")
	h1(v-if="sectionTitle") {{ sectionTitle }}
	h1(v-else) Fallback Title
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

<style lang="scss"></style>
