<template lang="pug">
div.w-fit.px-20.pt-20.ssection__inner-container.flex-shrink
    SECTION.ssection(
    :definedSectionID="'INTRO_SCENE_ID'")
        div.w-full.flex.flex-col(class="h-[900px]")
            LandSectionTemplate
            div(class="h-1/3")

    //- hidden  i have intro
    SECTION.ssection.hidden(
    :definedSectionID="'LAND_SCENE_ID'")
        h3 land deez nuts on your mouth

    SECTION.ssection(
    :definedSectionID="'ABOUT_SCENE_ID'", 
    :sectionTitle="'01:'")
        div(class="h-[120px]")
        AboutSectionTemplate
        div(class="h-[120px]")

    SECTION.ssection(
    :definedSectionID="'PROJECTS_SCENE_ID'", 
    :sectionTitle="'02:'")
        div(class="h-[120px]")
        ProjectSectionTemplate
        div(class="h-[120px]")

    //- hidden
    SECTION.ssection.hidden(
    :definedSectionID="'EXPERIENCE_SCENE_ID'")

    //- hidden
    SECTION.ssection.GLASS--transparent.hidden(
    :definedSectionID="'EDUCATION_SCENE_ID'", 
    :sectionTitle="'03:'")

    //- hidden
    SECTION.ssection.hidden(
    :definedSectionID="'COMMENT_SCENE_ID'", 
    :sectionTitle="'??:'")

    //- WebsiteCredits_section
    SECTION.ssection.justify-center.content-center(
    :definedSectionID="'CONTACT_SCENE_ID'")
        div(class="h-[120px]")
        WebsiteCredits
        div(class="h-[120px]")

    //- hidden
    Section_unreachable.ssection.unreachable-section.hidden(
    :definedSectionID="'ERROR_404_SCENE_ID'")
</template>

<script setup lang="ts">
import ThreeSceneBackground from "@/scripts/ThreeJS/ThreeEngine/ThreeSceneBackground.vue";
import SECTION from "./sections/SECTION.vue";
import Section_unreachable from "./sections/Section_unreachable.vue";
import NavLayerTemplate from "../NAVIGATION_LAYER/NavLayerTemplate.vue";
import LandSectionTemplate from "./sections/0_Land/LandSectionTemplate.vue";
import WebsiteCredits from "./sections/99_WebsiteCredits/WebsiteCredits.vue";
import ProjectSectionTemplate from "./sections/Projects/ProjectSectionTemplate.vue";
import AboutSectionTemplate from "./sections/AboutSectionTemplate/AboutSectionTemplate.vue";
</script>

<style scoped lang="scss">
.ssection {
	@apply w-full h-fit min-h-[360px];

	&__inner-container {
		@apply flex flex-col h-fit w-full;
	}
}
</style>
