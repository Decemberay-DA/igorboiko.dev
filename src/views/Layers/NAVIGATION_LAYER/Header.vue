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
		//- p(@click="HM.scrollTo(SN.EXPERIENCE_SECTION.name)")
		//- 	span.num(class="p") 02. 
		//- 	span.txt(class="p", id="EXPERIENCE_SECTION-header") Experience
		//- p(@click="HM.scrollTo(SN.EDUCATION_SECTION.name)")
		//- 	span.num(class="p") 03. 
		//- 	span.txt(class="p", id="EDUCATION_SECTION-header") Education
		//- p(@click="HM.scrollTo(SN.CONTACT_SECTION.name)")
		//- 	span.num(class="p") 04. 
		//- 	span.txt(class="p", id="CONTACT_SECTION-header") Contact
</template>

<script setup lang="ts">
import { ScrollToSectionCoroutined } from "@/scripts/CameraManagiment/Commands/ScrollToSectionCoroutined___";
import { asi } from "../../../scripts/asi/asi";
import { GE } from "@/scripts/GameEngine";
import DOMSearcherH from "@/scripts/VueTSHelper/DOMSearcherH";
import { pipe } from "fp-ts/lib/function";
import { array, string } from "fp-ts";
import type { IHTMLScene } from "@/scripts/CameraManagiment/DefinedScenes/IScene";

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
			title: pipe(scene.nameID, processSectionName, (s: string) => addPrefixValue(i, s));
			section: scene.htmlElement;
		}))
	);
};

const htmlSection = pipe(
	asi.data.ScenesRegistry.cahsedIHTMLScene,
	array.map((s) => s.nameID)
);

class HeaderManager extends GE.ADynamicObject {
	private headers!: HTMLElement[];
	private activeHeader: HTMLElement | null = null;
	private lastKnownHeader: HTMLElement | null = null;

	public constructor() {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.GUI_EFFECTS;
	}

	public scrollTo(sectionName: string) {
		ScrollToSectionCoroutined.instance.launchTransitionCoroutine(sectionName);
	}

	public override onStart(): void {
		this.headers = asi.data.DefinedSections.getAllSections
			.map((section) =>
				DOMSearcherH.maybeElementById(HeaderManager.sectionNameToHeaderIDName(section.name))
			)
			.filter((element): element is HTMLElement => element !== null);
	}

	private _previousHeader: HTMLElement | null = null;
	/**
	 * since i wasn`t able to stup mediator i am checking stuff framely
	 */
	public override onFrameUpdate(): void {
		const currentSection = asi.data.DefinedSections.curentSection;
		if (!currentSection) return;
		this.activeHeader = this.headerHTMLElementFromSectionName(currentSection.name) ?? null;
		if (this.activeHeader) {
			this.lastKnownHeader = this.activeHeader;
		}

		const isSame = this.activeHeader === this._previousHeader;
		if (!isSame) {
			this.triggerUpdateHeaderStyle();
		}

		this._previousHeader = this.activeHeader;
	}

	public static sectionNameToHeaderIDName(sectionName: string) {
		return sectionName + "-header";
	}
	private headerHTMLElementFromSectionName(sectionName: string) {
		return this.headers.find(
			(header) => header.id === HeaderManager.sectionNameToHeaderIDName(sectionName)
		);
	}
	private triggerUpdateHeaderStyle() {
		this.headers.forEach((header) => {
			header.classList.remove("txt__current");
		});
		if (this.lastKnownHeader) {
			this.lastKnownHeader.classList.add("txt__current");
		}
	}
}

const SN = asi.data.DefinedSections;
const HM = new HeaderManager();
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
