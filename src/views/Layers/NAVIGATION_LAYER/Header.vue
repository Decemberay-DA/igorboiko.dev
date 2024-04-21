<template lang="pug">
div.pointer-events-none.left-0
	div.h-20.w-full.pr-20.flex.flex-row-reversed.gap-10.items-center.justify-end 
		p(@click="HM.scrollTo(SN.INTRO_SECTION.name)")
			span.num(class="p") 00. 
			span.txt(class="p", id="INTRO_SECTION-header") Main
		p(@click="HM.scrollTo(SN.ABOUT_SECTION.name)")
			span.num(class="p") 01. 
			span.txt(class="p", id="ABOUT_SECTION-header") About
		p(@click="HM.scrollTo(SN.PROJECTS_SECTION.name)")
			span.num(class="p") 02. 
			span.txt(class="p", id="PROJECTS_SECTION-header") Projects
</template>

<script setup lang="ts">
import { asi } from "../../../scripts/asi/asi";
import { pipe } from "fp-ts/lib/function";
import { array, string } from "fp-ts";
import type { IHTMLScene } from "../../../scripts/CameraManagiment/DefinedScenes/IScene";

/**
 * takes name like "ABOUT_ME_SCENE_ID"
 * 0 removes "SCENE_ID" postfix
 * 1 replaces "_" with " "
 * 2 makes all symbols lowercase
 * 3 makes first letter capital
 * final: "About me"
 */
const humanizeSceneName = (nameID: string) => {
	return pipe(
		nameID,
		(str) => str.replace(/_SCENE_ID$/, ""),
		(str) => str.replace(/_/g, " "),
		(str) => str.toLowerCase(),
		(str) => str.charAt(0).toUpperCase() + str.slice(1)
	);
};

const processSectionName = (nameID: string) => {
	switch (nameID) {
		// some extraordinary cases
		case "ABOUT_ME_SCENE_ID":
			return "About me";
		default:
			return humanizeSceneName(nameID);
	}
};

/**
 * make number always be 2 letters as example
 * 1 => 01
 * 5 => 05
 * 0 => 00
 */
const addPrefixValue = (i: number, sectionName: string) => {
	return `0${i} ${sectionName}`;
};

const buildDisplayReadyDataArray = (htmlScenes: IHTMLScene[]): { title: string; section: HTMLElement }[] => {
	return pipe(
		htmlScenes,
		array.mapWithIndex((i, scene) => ({
			title: pipe(scene.nameID, processSectionName, (s: string) => addPrefixValue(i, s)),
			section: scene.htmlElement,
		}))
	);
};

const htmlSection = pipe(
	asi.data.ScenesRegistry.cahsedIHTMLScene,
	array.map((s) => s.nameID)
);
</script>

<style scoped lang="scss">
.txt {
	@apply text-GWHITE pointer-events-auto cursor-pointer;
	transition: color 0.3s ease-in-out;

	&__current {
		@apply text-GACTIVE;
	}

	&:hover {
		@apply text-GACTIVE;
	}
}
.num {
	@apply w-fit h-fit pointer-events-auto;
	overflow: visible;
	padding: 0.5rem;
	line-height: 1.5;
	white-space: nowrap;

	@apply text-GACTIVE;
}
</style>
