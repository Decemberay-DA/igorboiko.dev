<template lang="pug">
div.icon
	li YouTube
	li GitHub
	li RSS
</template>

<script lang="ts">
import { defineProps } from "vue";

const props = defineProps({
	iconClassName: {
		type: svg,
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
