<template lang="pug">

//- left top icon
//- div.absolute.left-0.top-0
    div.h-20.w-20.flex.items-center.justify-center
       .logo.pointer-events-auto.h-10.w-10.bg-GWHITE.allign-center(@click="scrollTo(asi.data.DefinedSections.INTRO_SECTION.name)")



Header.absolute.right-0.top-0.pr-10

//- icon stack left
div.side-stack.absolute.left-0.bottom-0.items-center.justify-start
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
import { GE } from "@/scripts/GameEngine";
import Header from "./Header.vue";
import IconArtStation from "@/views/icons/IconArtStation.vue";
import IconGitHub from "@/views/icons/IconGitHub.vue";
import IconTelegram from "@/views/icons/IconTelegram.vue";
import IconInstagram from "@/views/icons/IconInstagram.vue";
import IconYouTube from "@/views/icons/IconYouTube.vue";

import DOMSearcher from "@/scripts/VueTSHelper/DOMSearcher";
import { THREE } from "@/scripts/ThreeJS/THREE";
import { asi } from "@/scripts/asi/asi";
import { ScrollToSectionCoroutined } from "@/scripts/CameraManagiment/Commands/ScrollToSectionCoroutined";

const scrollTo = (sectionName: string) => {
	ScrollToSectionCoroutined.instance.launchTransitionCoroutine(sectionName);
};

class SideStackMagician extends GE.ADynamicObject {
	private stack!: HTMLElement;

	public constructor() {
		super();
		this.__onFrameUpdatePriority = GE.OnFrameUpdatePriorities.GUI_EFFECTS;
	}

	public override onStart(): void {
		this.stack = DOMSearcher.getElementById("side-stack-89906bb0-5f3d-401d-9d8c-109faf03b099");
	}

	private transitionDistanceTreshold = 300;
	private _lastFrameState = false;
	public override onFrameUpdate(): void {
		const rect = this.stack.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const centerOfElement = new THREE.Vector2(centerX, centerY);

		const dustanceToCursor = asi.context.cursor.clientRelstive.position.distanceTo(centerOfElement);

		const isInRange = dustanceToCursor < this.transitionDistanceTreshold;

		const isNewStateChanged = this._lastFrameState !== isInRange;

		// eq changed to in range
		if (isNewStateChanged && isInRange) {
			this.stack.classList.add("sgap__manual-hover");
		}
		if (isNewStateChanged && !isInRange) {
			this.stack.classList.remove("sgap__manual-hover");
		}

		this._lastFrameState = isInRange;
	}
}
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
.logo {
	@apply bg-GWHITE;
	transition: background-color 0.24s ease-in-out;

	&:hover {
		@apply bg-GACTIVE;
	}
}
</style>
