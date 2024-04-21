<template>
	<!-- 3d background THREE_SPACE_SCENE_LAYER -->
	<LAYER :definedLayerID="'THREE_SPACE_SCENE_LAYER'" class="absolute w-full h-full pointer-events-none">
		<template v-slot:default>
			<!--LoadCurtains-->
			<!-- <div class="fixed inset-0 bg-gray z-[-9999999]"></div> -->
			<ThreeSceneBackground class="DEFINED_LAYER" />
		</template>
	</LAYER>

	<LAYER :definedLayerID="'CENTER_LAYER'" :isScrollable="true" class="pointer-events-auto">
		<template v-slot:default>
			<CenterLayerContent class="w-fit px-20 pt-20 SECTION__inner-container flex-shrink" />
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
import LAYER from "./views/Layers/LAYER.vue";
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
import CenterLayerContent from "./views/Layers/CENTER_LAYER/CenterLayerContent.vue";
</script>

<style lang="scss">
@import "./assets/styles/styles.min.css";
@import "@/styles/global.scss";
</style>
