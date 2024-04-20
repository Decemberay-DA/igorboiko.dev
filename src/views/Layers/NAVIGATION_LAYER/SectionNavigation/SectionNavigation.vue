<template lang="pug">
div.pointer-events-none.left-0
	div.h-20.w-full.pr-20.flex.flex-row-reversed.gap-10.items-center.justify-end 
		HeaderButton(
			v-for="button in displayReadyDataArray" 
			:number="button.title.number" 
			:title="button.title.text" 
			:scrollToSectionElement="button.section")
		div.hidden
<template>

<script setup lang="ts">
import { asi } from "../../../../scripts/asi/asi";
import { pipe } from "fp-ts/lib/function";
import { array } from "fp-ts";
import type { IHTMLScene } from "@/scripts/CameraManagiment/DefinedScenes/IScene";
import HeaderButton from "./HeaderButton.vue";

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

const buildDisplayReadyDataArray = (htmlScenes: IHTMLScene[]) => {
	return pipe(
		htmlScenes,
		array.mapWithIndex((i, scene) => ({
			title: pipe(scene.nameID, processSectionName, (s: string) => ({
				number: i,
				text: s,
			})),
			section: scene.htmlElement,
		}))
	);
};

const displayReadyDataArray = buildDisplayReadyDataArray(asi.data.ScenesRegistry.cahsedIHTMLScene);
</script>

<style scoped lang="scss"></style>
