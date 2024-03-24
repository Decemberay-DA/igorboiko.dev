<template>
	<v-container>
		<v-row class="flex flex-row gap-5">
			<h1 class="header text-lg md:text-xl lg:text-2xl">LOGO</h1>
			<h2 class="header text-xl">Content</h2>
			<h2 class="header text-xl">Content</h2>
			<h2 class="header text-xl">Content</h2>
			<h2 class="header text-xl">Content</h2>
			<v-btn prepend-icon="$vuetify" variant="tonal" class="text-xl bg-red-600 hover:bg-red-700">
				Button
			</v-btn>
		</v-row>
	</v-container>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
.header {
	content: "";
}
</style>
