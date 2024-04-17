<template lang="pug">
div.pointer-events-none.left-0
	div.h-20.w-full.pr-20.flex.flex-row-reversed.gap-10.items-center.justify-end 
		p(@click="HM.scrollTo(SN.ABOUT_SECTION.name)")
			span.num 00. 
			span.txt(id="ABOUT_SECTION-header") About
		p(@click="HM.scrollTo(SN.PROJECTS_SECTION.name)")
			span.num 01. 
			span.txt(id="PROJECTS_SECTION-header") Projects
		p(@click="HM.scrollTo(SN.EXPERIENCE_SECTION.name)")
			span.num 02. 
			span.w-10.flex-none
			span.txt(id="EXPERIENCE_SECTION-header") Experience
		p(@click="HM.scrollTo(SN.EDUCATION_SECTION.name)")
			span.num 03. 
			span.txt(id="EDUCATION_SECTION-header") Education
		p(@click="HM.scrollTo(SN.CONTACT_SECTION.name)")
			span.num 04. 
			span.txt(id="CONTACT_SECTION-header") Contact
</template>

<script setup lang="ts">
import { ScrollToSectionCoroutined } from "@/scripts/CameraManagiment/Commands/ScrollToSectionCoroutined";
import { asi } from "../../../scripts/asi/asi";
import { GE } from "@/scripts/GameEngine";
import DOMSearcher from "@/scripts/VueTSHelper/DOMSearcher";

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
				DOMSearcher.maybeElementById(HeaderManager.sectionNameToHeaderIDName(section.name))
			)
			.filter((element): element is HTMLElement => element !== null);
	}

	private _previousHeader: HTMLElement | null = null;
	/**
	 * since i wasn`t able to stup mediator i am checking stuff framely
	 */
	public override onFrameUpdate(): void {
		const currentSection = asi.context.section;
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
::v-deep p {
	@apply w-fit h-fit pointer-events-auto;
	overflow: visible;
	padding: 0.5rem;
	line-height: 1.5;
	white-space: nowrap;
}
.txt {
	@apply text-GWHITE;
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
