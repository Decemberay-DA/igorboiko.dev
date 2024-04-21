<template>
	<!-- <LAYER :definedLayerID="'bl-abla-bla-bla'" class="pointer-events-none">
		<template v-slot:default> </template>
	</LAYER> -->

	<!-- 3d background THREE_SPACE_SCENE_LAYER -->
	<LAYER :definedLayerID="'THREE_SPACE_SCENE_LAYER'" class="absolute w-full h-full pointer-events-none">
		<template v-slot:default>
			<div class="fixed inset-0 bg-black z-[-9999999]"></div>
			<ThreeSceneBackground class="DEFINED_LAYER hidden" />
		</template>
	</LAYER>

	<LAYER :definedLayerID="'CENTER_LAYER'" :isScrollable="true" class="pointer-events-auto">
		<template v-slot:default>
			<div class="w-fit px-20 pt-20 SECTION__inner-container flex-shrink">
				<SECTION :definedSectionID="'INTRO_SECTION'" class="SECTION">
					<template v-slot:default>
						<div class="h-[900px] w-full flex flex-col">
							<LandSectionTemplate />
							<div class="h-1/3"></div>
						</div>
					</template>
				</SECTION>

				<!-- hidden  i have intro -->
				<SECTION :definedSectionID="'LAND_SECTION'" class="SECTION hidden">
					<template v-slot:default>
						<h3>land deez nuts on your mouth</h3>
					</template>
				</SECTION>

				<SECTION :definedSectionID="'ABOUT_SECTION'" :sectionTitle="'01:'" class="SECTION">
					<template v-slot:default>
						<div class="h-[120px]"></div>
						<AboutSectionTemplate />
						<div class="h-[120px]"></div>
					</template>
				</SECTION>

				<SECTION :definedSectionID="'PROJECTS_SECTION'" :sectionTitle="'02:'" class="SECTION">
					<template v-slot:default>
						<div class="h-[120px]"></div>
						<ProjectSectionTemplate />
						<div class="h-[120px]"></div>
					</template>
				</SECTION>

				<!-- hidden -->
				<SECTION :definedSectionID="'EXPERIENCE_SECTION'" class="SECTION hidden">
					<template v-slot:default> </template>
				</SECTION>

				<!-- hidden -->
				<SECTION
					:definedSectionID="'EDUCATION_SECTION'"
					:sectionTitle="'03:'"
					class="SECTION GLASS--transparent hidden">
					<template v-slot:default> </template>
				</SECTION>

				<!-- hidden -->
				<SECTION :definedSectionID="'COMMENT_SECTION'" :sectionTitle="'??:'" class="SECTION hidden">
					<template v-slot:default> </template>
				</SECTION>

				<!-- WebsiteCredits_section -->
				<SECTION :definedSectionID="'CONTACT_SECTION'" class="SECTION justify-center content-center">
					<template v-slot:default>
						<div class="h-[120px]"></div>
						<WebsiteCredits />
						<div class="h-[40px]"></div>
					</template>
				</SECTION>

				<!-- hidden -->
				<Section_unreachable
					:definedSectionID="'ERROR_404_PAGE'"
					class="SECTION unreachable-section hidden">
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
			<div id="cursor_betreyal_foregroundStar" class="invisible"></div>
			<div id="cursor_betreyal_backgroundStar" class="invisible"></div>
		</template>
	</LAYER>
</template>

<script setup lang="ts">
import ThreeSceneBackground from "./scripts/ThreeJS/ThreeEngine/ThreeSceneBackground.vue";
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
import WebsiteCredits from "./views/Layers/CENTER_LAYER/sections/99_WebsiteCredits/WebsiteCredits.vue";
import ProjectSectionTemplate from "./views/Layers/CENTER_LAYER/sections/Projects/ProjectSectionTemplate.vue";
import AboutSectionTemplate from "./views/Layers/CENTER_LAYER/sections/AboutSectionTemplate/AboutSectionTemplate.vue";
</script>

<style lang="scss">
@import "./assets/styles/styles.min.css";
@import "@/styles/global.scss";

.cover-whole-screen-fixed {
	@apply fixed inset-0;
}

.SECTION {
	@apply w-full h-fit min-h-[360px];
	// height: 600px;

	&__inner-container {
		@apply flex flex-col h-fit w-full;
	}
}
</style>
