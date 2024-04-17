<template>
	<LAYER :definedLayerID="'bl-abla-bla-bla'" class="pointer-events-none">
		<template v-slot:default> </template>
	</LAYER>

	<!-- 3d background THREE_SPACE_SCENE_LAYER -->
	<LAYER :definedLayerID="'THREE_SPACE_SCENE_LAYER'" class="THREE pointer-events-none">
		<template v-slot:default>
			<ThreeSceneBackground class="DEFINED_LAYER" />
		</template>
	</LAYER>

	<LAYER :definedLayerID="'CENTER_LAYER'" :isScrollable="true" class="pointer-events-auto">
		<template v-slot:default>
			<div class="p-20">
				<div class="w-fit SECTION__inner-container flex-shrink">
					<SECTION :definedSectionID="'INTRO_SECTION'" :sectionTitle="'introusuy'" class="SECTION">
						<template v-slot:default> </template>
					</SECTION>

					<SECTION :definedSectionID="'LAND_SECTION'" :sectionTitle="'deezer'" class="SECTION">
						<template v-slot:default>
							<h3>land deez nuts on your mouth</h3>
						</template>
					</SECTION>

					<SECTION
						:definedSectionID="'ABOUT_SECTION'"
						:sectionTitle="'who i am idk'"
						class="SECTION"
					>
						<template v-slot:default> 

							<baseIcon  />

						</template>
					</SECTION>

					<SECTION
						:definedSectionID="'PROJECTS_SECTION'"
						:sectionTitle="'some of my project'"
						class="SECTION GLASS--transparent"
					>
						<template v-slot:default> </template>
					</SECTION>

					<SECTION
						:definedSectionID="'EXPERIENCE_SECTION'"
						:sectionTitle="'Experience'"
						class="SECTION"
					>
						<template v-slot:default>
							<h3>section content started</h3>
							<ChangeCameraSceneButton class="w-full" />
							<ChangeCameraSceneButton class="w-full" />
							<h3>section content ended</h3>
						</template>
					</SECTION>

					<SECTION
						:definedSectionID="'EDUCATION_SECTION'"
						:sectionTitle="'Education'"
						class="SECTION GLASS--transparent"
					>
						<template v-slot:default> </template>
					</SECTION>

					<SECTION :definedSectionID="'COMMENT_SECTION'" :sectionTitle="'comments'" class="SECTION">
						<template v-slot:default>
							<ChangeCameraSceneButton />
						</template>
					</SECTION>

					<SECTION
						:definedSectionID="'CONTACT_SECTION'"
						:sectionTitle="'contact me'"
						class="SECTION GLASS--transparent"
					>
						<template v-slot:default> </template>
					</SECTION>

					<Section_unreachable
						:definedSectionID="'ERROR_404_PAGE'"
						class="SECTION unreachable-section"
					>
						<template v-slot:default> </template>
					</Section_unreachable>
				</div>
			</div>
		</template>
	</LAYER>

	<!-- FIXED NAVIGATIONAL BAAR -->
	<LAYER :definedLayerID="'NAVIGATION_LAYER'" class="pointer-events-none">
		<template v-slot:default>
			<div class="absolute left-0 top-0">
				<div class="h-20 w-20 flex items-center justify-center">
					<div class="h-10 w-10 bg-black allign-center"></div>
				</div>
			</div>
			<Header class="absolute right-0 top-0" />
			<div class="absolute left-0 bottom-0">
				<div class="h-20 w-20 flex items-center justify-center">
					<div class="h-10 w-10 bg-black allign-center"></div>
				</div>
			</div>
			<div class="absolute right-0 bottom-0">
				<div class="h-20 w-20 flex items-center justify-center">
					<div class="h-10 w-10 bg-black allign-center"></div>
				</div>
			</div>
		</template>
	</LAYER>

	<LAYER :definedLayerID="'compatability shit'" class="pointer-events-none">
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
import baseIcon from "./views/icons/baseIcon.vue";
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
.cover-whole-screen-fixed {
	@apply fixed inset-0;
}

// ========-====-====-====-============ ========-====-====-====-============
// common styles idk ========-====-====-====-============
// ========-====-====-====-============ ========-====-====-====-============
.PANNEL {
	&--white {
		@apply backdrop-blur-sm bg-white/25;
	}
	&--gray {
		@apply backdrop-blur-sm bg-white/25;
	}
}
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

	// SECTION ========-====-====-====-============
	&__sidescreen-conteiner {
		@apply flex flex-row;
	}
	// used to give to top layer space to be on the sides and top/bottom
	&__sidescreen-spaceholder {
		@apply w-20 h-full flex-shrink-0 flex-grow-0;
	}
	&__topscreen-spaceholder {
		@apply h-20 w-full flex-shrink-0 flex-grow-0;
	}
	&__inner-container {
		@apply flex flex-col h-fit w-full;
	}
}
</style>
