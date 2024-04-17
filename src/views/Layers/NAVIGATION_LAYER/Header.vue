<template lang="pug">
div.pointer-events-none
	div.h-20.w-20.flex.items-center.justify-start
		div.h-fit.gap-10.w-20.flex.flex-row-reverse 
			p.interactible(@click="go(sec.INTRO_SECTION.name)") 00. Intro
			p.interactible(@click="go(sec.LAND_SECTION.name)") 01. Main
			p.interactible(@click="go(sec.ABOUT_SECTION.name)") 02. About
			p.interactible(@click="go(sec.PROJECTS_SECTION.name)") 03. Projects
			p.interactible(@click="go(sec.EXPERIENCE_SECTION.name)") 04. Experience
			p.interactible(@click="go(sec.EDUCATION_SECTION.name)") 05. Education
			p.interactible(@click="go(sec.COMMENT_SECTION.name)") 06. Comments
			p.interactible(@click="go(sec.CONTACT_SECTION.name)") 07. Contact
			p.interactible(@click="go(sec.ERROR_404_PAGE.name)") 08. ERROR
	div.h-10.w-10.bg-black.allign-center
</template>

<script setup lang="ts">
import { ScrollToSectionCoroutined } from "@/scripts/CameraManagiment/Commands/ScrollToSectionCoroutined";
import { asi } from "../../../scripts/asi/asi";

const sec = asi.data.DefinedSections;

const go = (sectionName: string) => ScrollToSectionCoroutined.instance.launchTransitionCoroutine(sectionName);
</script>

<style scoped lang="scss">
::v-deep p {
	@apply w-fit h-fit pointer-events-auto;
	@apply text-green-500;
	overflow: visible;
	padding: 0.5rem;
	line-height: 1.5;
	white-space: nowrap;
}
</style>
