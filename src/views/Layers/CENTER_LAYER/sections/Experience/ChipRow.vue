<template lang="pug">
div.h-fit.w-fit
    div(v-for="chip in chips" :key="chip.name")
        div.chip-card
            span {{ chip.name }}
</template>

<script setup lang="ts">
import { defineProps, type PropType } from "vue";

type TChipType = "SOFT" | "HARD";
interface IChip {
	type: TChipType;
	name: string;
}

const props = defineProps({
	chips: {
		type: Array as PropType<IChip[]>,
		required: true,
	},
});
</script>

<style scoped lang="scss">
.chip-card {
	@apply GLASS--rought rounded-full h-fit w-fit p-1;
	overflow: visible;
	padding: 0.5rem;
	line-height: 1.5;
	white-space: nowrap;
}
</style>
