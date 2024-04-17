<template lang="pug">
div
    h2 {{ title  }}
    p.description {{ shortDecription }}
    separetor-stick.h-1.w-fill.bg-white
    p.description {{ extendedDecription }}
    separetor-stick.h-1.w-fill.bg-white
    ChipRow(:chips="chips")
</template>

<script setup lang="ts">
import { defineProps, type PropType } from "vue";
import ChipRow from "./ChipRow.vue";

type TChipType = "SoftSkill" | "HardSkill";
interface IChip {
	type: TChipType;
	name: string;
}
interface IWorkDetails {
	startDate: string;
	endDate: string;
	type: "full-time" | "part-time";
}
interface IDescription {
	short: string;
	extended: string;
}

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: Object as PropType<IDescription>,
		required: true,
	},
	details: {
		type: Object as PropType<IWorkDetails>,
		required: true,
	},
	chips: {
		type: Array as PropType<IChip[]>,
		required: true,
	},
});
</script>

<style lang="scss">
.chip-card {
	@apply GLASS--rought rounded-full h-fit w-fit p-1;
}
.description {
	content: "";
}
</style>
