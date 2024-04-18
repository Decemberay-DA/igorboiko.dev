<template>
	<!-- <LAYER :definedLayerID="'bl-abla-bla-bla'" class="pointer-events-none">
		<template v-slot:default> </template>
	</LAYER> -->

	<!-- 3d background THREE_SPACE_SCENE_LAYER -->
	<LAYER :definedLayerID="'THREE_SPACE_SCENE_LAYER'" class="THREE pointer-events-none">
		<template v-slot:default>
			<!-- <div class="fixed inset-0 bg-black z-[-9999999]"></div> -->
			<ThreeSceneBackground class="DEFINED_LAYER" />
		</template>
	</LAYER>

	<LAYER :definedLayerID="'CENTER_LAYER'" :isScrollable="true" class="pointer-events-auto">
		<template v-slot:default>
			<div class="w-fit p-20 SECTION__inner-container flex-shrink">
				<SECTION :definedSectionID="'INTRO_SECTION'" class="SECTION h-screen justify-end">
					<template v-slot:default class="align-middle justify-end">
						<LandSectionTemplate />
						<div class="h-1/3"></div>
					</template>
				</SECTION>

				<SECTION
					:definedSectionID="'LAND_SECTION'"
					:sectionTitle="'what is it for if i have intro = land'"
					class="SECTION"
				>
					<template v-slot:default>
						<h3>land deez nuts on your mouth</h3>
					</template>
				</SECTION>

				<SECTION :definedSectionID="'ABOUT_SECTION'" :sectionTitle="'00:'" class="SECTION">
					<template v-slot:default>
						<div class="flex flex-col gap-4">icon</div>
					</template>
				</SECTION>

				<SECTION
					:definedSectionID="'PROJECTS_SECTION'"
					:sectionTitle="'01:'"
					class="SECTION GLASS--transparent"
				>
					<template v-slot:default> </template>
				</SECTION>

				<SECTION :definedSectionID="'EXPERIENCE_SECTION'" :sectionTitle="'00:'" class="SECTION">
					<template v-slot:default> </template>
				</SECTION>

				<SECTION
					:definedSectionID="'EDUCATION_SECTION'"
					:sectionTitle="'03:'"
					class="SECTION GLASS--transparent"
				>
					<template v-slot:default> </template>
				</SECTION>

				<SECTION :definedSectionID="'COMMENT_SECTION'" :sectionTitle="'??:'" class="SECTION">
					<template v-slot:default> </template>
				</SECTION>

				<SECTION
					:definedSectionID="'CONTACT_SECTION'"
					:sectionTitle="'04:'"
					class="SECTION GLASS--transparent"
				>
					<template v-slot:default> </template>
				</SECTION>

				<Section_unreachable :definedSectionID="'ERROR_404_PAGE'" class="SECTION unreachable-section">
					<template v-slot:default> </template>
				</Section_unreachable>
			</div>
		</template>
	</LAYER>

	<!-- FIXED NAVIGATIONAL BAAR -->
	<LAYER :definedLayerID="'NAVIGATION_LAYER'" class="pointer-events-none z-[+9999999999]">
		<template v-slot:default>
			<NavLayerTemplate />
		</template>
	</LAYER>

	<LAYER :definedLayerID="'compatability thingys'" class="pointer-events-none">
		<template v-slot:default>
			<div id="cursor_betreyal_foregroundStar"></div>
			<div id="cursor_betreyal_backgroundStar"></div>
		</template>
	</LAYER>
</template>

<script setup lang="ts">
import ThreeSceneBackground from "./scripts/ThreeJS/ThreeSceneBackground.vue";

import ChangeCameraSceneButton from "./scripts/CameraManagiment/Commands/ChangeCameraSceneButton.vue";
import Header from "./views/Layers/NAVIGATION_LAYER/Header.vue";
import LAYER from "./views/Layers/CENTER_LAYER/LAYER.vue";
import SECTION from "./views/Layers/CENTER_LAYER/sections/SECTION.vue";
import Section_unreachable from "./views/Layers/CENTER_LAYER/sections/Section_unreachable.vue";

// icons
import IconArtStation from "./views/icons/IconArtStation.vue";
import IconGitHub from "./views/icons/IconGitHub.vue";
import IconTelegram from "./views/icons/IconTelegram.vue";
import IconYouTube from "./views/icons/IconYouTube.vue";
import IconDropDownArrow from "./views/icons/IconDropDownArrow.vue";
import IconLink from "./views/icons/IconLink.vue";
// sections content
import NavLayerTemplate from "./views/Layers/NAVIGATION_LAYER/NavLayerTemplate.vue";
import LandSectionTemplate from "./views/Layers/CENTER_LAYER/sections/0_Land/LandSectionTemplate.vue";
</script>

<style lang="scss">
@import "./assets/styles/styles.min.css";
// @import "./assets/styles/global/TextStyles.min.css";
// ========-====-====-====-============ ========-====-====-====-============
// Cleaner ========-====-====-====-============
// ========-====-====-====-============ ========-====-====-====-============
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	outline: none;
}
body {
	font-family: Montserrat, Arial, sans-serif;
}

.cover-whole-screen-fixed {
	@apply fixed inset-0;
}

// ========-====-====-====-============ ========-====-====-====-============
// common styles idk ========-====-====-====-============
// ========-====-====-====-============ ========-====-====-====-============
// .PANNEL {
// 	&--white {
// 		@apply backdrop-blur-sm bg-white/25;
// 	}
// 	&--gray {
// 		@apply backdrop-blur-sm bg-white/25;
// 	}
// }
.GLASS {
	&--transparent {
		@apply backdrop-blur-sm bg-white/25;
	}
	&--rought {
		@apply backdrop-blur-md bg-white/50;
	}
}

// ========-====-====-====-============ ========-====-====-====-============
// THREE => three layer with scene background ========-====-====-====-============
// ========-====-====-====-============ ========-====-====-====-============
.THREE {
	@apply absolute w-full h-full;
}

// ========-====-====-====-============ ========-====-====-====-============
// NAV => navigational toppest absolute leyer ========-====-====-====-============
// ========-====-====-====-============ ========-====-====-====-============
.NAV {
	@apply cover-whole-screen-fixed;
}

// ========-====-====-====-============ ========-====-====-====-============
// SECTION ========-====-====-====-============
// ========-====-====-====-============ ========-====-====-====-============
.SECTION {
	@apply w-full;
	min-height: 600px;

	&__inner-container {
		@apply flex flex-col h-fit w-full;
	}
}

// ========-====-====-====-============ ========-====-====-====-============
// Text styles ========-====-====-====-============
// ========-====-====-====-============ ========-====-====-====-============
._font_base {
	@apply text-GWHITE;
}
._Montserrat {
	font-family: Montserrat, Arial, sans-serif;
}
._Helvetica {
	font-family: Helvetica, Arial, sans-serif;
}

.section-pointer {
	// p
	@apply _font_base _Montserrat;
	font-size: 18px;
	font-weight: normal;
	line-height: 10%;
	@apply text-GACTIVE;
}

p {
	@apply _font_base _Montserrat;
	font-size: 18px;
	font-weight: normal;
	line-height: 10%;
	// omg
	font-family: var(--p-font-family);
	font-size: var(--p-font-size);
	font-style: var(--p-font-style);
	font-weight: var(--p-font-weight);
	letter-spacing: var(--p-letter-spacing);
	line-height: var(--p-line-height);
}
.p-bold {
	@apply _font_base _Montserrat;
	font-size: 18px;
	font-weight: bold;
	line-height: 10%;
}

h1 {
	@apply _font_base _Helvetica;
	font-size: 123.36px;
	font-weight: 800;
	line-height: 108%;
}
h2 {
	@apply _font_base _Helvetica;
	font-size: 47.12px;
	font-weight: bold;
	line-height: 108%;
}
h3 {
	@apply _font_base _Helvetica;
	font-size: 29.12px;
	font-weight: normal;
	line-height: 140%;
}

.interactible {
	@apply text-GWHITE;
	transition: color 0.3s ease-in-out;

	&:hover {
		@apply text-GACTIVE;
	}
}
</style>
