<template>
	<button class="btn" @click="clickHandler">The Button</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "Button",
	methods: {
		clickHandler() {
			this.$emit("click");
		},
	},
});
</script>

<style lang="scss" scoped>
.btn {
	@apply rounded-full bg-blue-200;
	@apply flex justify-center items-center border-none rounded-md transition-colors duration-200 ease-in-out;

	&:hover {
		@apply text-white bg-blue-700;
	}

	&:active {
		@apply text-black bg-blue-50;
	}
}
</style>
