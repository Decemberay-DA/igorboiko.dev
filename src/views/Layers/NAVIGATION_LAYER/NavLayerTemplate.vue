<template lang="pug">
//- left top icon
//- div.absolute.left-0.top-0
    div.h-20.w-20.flex.items-center.justify-center
       .logo.pointer-events-auto.h-10.w-10.bg-GWHITE.allign-center(@click="scrollTo(asi.data.DefinedSections.INTRO_SECTION.name)")

Header.absolute.right-0.top-0.pr-10

LinkStick.absolute.left-0.bottom-0

//- just a rignt lines with mail
div.side-stack.absolute.right-0.bottom-0.items-center.justify-start
    div.the-stick.invisible
    div.the-stick.invisible
    .h-28.flex-none
    a.h-fit.w-fit.pointer-events-auto(href="https://v4.brittanychiang.com/" target="_blank")
        p.one-line-text.rotate-90.interactible.h-fit.w-fit wanerosu8@gmail.com
    .h-28.flex-none
    div.the-stick


</template>

<script setup lang="ts">
import Header from "./Header.vue";
import LinkStick from "./LinkStick/LinkStick.vue";
</script>

<style scoped lang="scss">
@import "@/styles/global.scss";

.side-stack {
	@apply w-20 h-full flex flex-col;
}
.the-stick {
	@apply w-[2px] h-full bg-GWHITE;
}
.logo {
	@apply bg-GWHITE;
	transition: background-color 0.24s ease-in-out;

	&:hover {
		@apply bg-GACTIVE;
	}
}
</style>
