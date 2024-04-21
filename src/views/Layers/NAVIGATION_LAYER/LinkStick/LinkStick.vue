<template lang="pug">
//- icon stack left
div.side-stack.items-center.justify-start
    .the-stick.invisible
    .h-4.flex-none
    div.sgap.flex.flex-col.pointer-events-auto.h-fit(id="side-stack-89906bb0-5f3d-401d-9d8c-109faf03b099")
        IconArtStation
        IconGitHub
        IconYouTube
        IconInstagram
        IconTelegram
    //- div.flex.flex-col.h-full
    .h-4.flex-none
    div.the-stick
</template>

<script setup lang="ts">
import IconGitHub from "@/views/icons/IconGitHub.vue";
import IconArtStation from "@/views/icons/IconArtStation.vue";
import IconYouTube from "@/views/icons/IconYouTube.vue";
import IconInstagram from "@/views/icons/IconInstagram.vue";
import IconTelegram from "@/views/icons/IconTelegram.vue";
import SideStackMagician from "./LinkStickMagician";

const SM = new SideStackMagician();
</script>

<style scoped lang="scss">
@import "@/styles/global.scss";

.side-stack {
	@apply w-20 h-full flex flex-col;
}
.sgap {
	@apply gap-4;
	transition: gap 0.24s ease-in-out;

	&__manual-hover {
		@apply gap-6;
	}

	&:hover {
		@apply gap-7;
	}
}
.the-stick {
	@apply w-[2px] h-full bg-GWHITE;
}
</style>
