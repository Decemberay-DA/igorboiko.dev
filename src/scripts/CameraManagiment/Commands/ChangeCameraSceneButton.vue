<template>
	<div class="flex flex-col gap-2 w-6/12 self-center">
		<button class="c-debuger__button" @click="handleClick(asi.data.DefinedSections.INTRO_SECTION.name)">
			0 Change scene to INTRO_SECTION
		</button>
		<button class="c-debuger__button" @click="handleClick(asi.data.DefinedSections.LAND_SECTION.name)">
			1 Change scene to LAND_SECTION
		</button>
		<button class="c-debuger__button" @click="handleClick(asi.data.DefinedSections.ABOUT_SECTION.name)">
			2 Change scene to ABOUT_ME_SECTION
		</button>
		<button
			class="c-debuger__button"
			@click="handleClick(asi.data.DefinedSections.PROJECTS_SECTION.name)"
		>
			3 Change scene to PROJECTS_SECTION
		</button>
		<button
			class="c-debuger__button"
			@click="handleClick(asi.data.DefinedSections.EXPERIENCE_SECTION.name)"
		>
			4 Change scene to EXPERIENCE_SECTION
		</button>
		<button
			class="c-debuger__button"
			@click="handleClick(asi.data.DefinedSections.EDUCATION_SECTION.name)"
		>
			5 Change scene to EDUCATION_SECTION
		</button>
		<button class="c-debuger__button" @click="handleClick(asi.data.DefinedSections.COMMENT_SECTION.name)">
			6 Change scene to COMMENT_SECTION
		</button>
		<button class="c-debuger__button" @click="handleClick(asi.data.DefinedSections.CONTACT_SECTION.name)">
			7 Change scene to CONTACT_SECTION
		</button>
		<button class="c-debuger__button" @click="handleClick(asi.data.DefinedSections.ERROR_404_PAGE.name)">
			99 Change scene to ERROR_404_PAGE
		</button>
	</div>
</template>

<script setup lang="ts">
import { asi } from "../../asi/asi";

const handleClick = (sceneName: string) => {
	console.warn(
		"will translated to scene " +
			sceneName +
			" total ammount of registered scense in asi is " +
			asi.data.CAMERA_SCENES.scenes.length
	);
	asi.data.CAMERA_SCENES.tweenToScene(sceneName);
};
</script>

<style scoped lang="scss">
.c-debuger {
	@apply fixed top-0 left-0 w-1/5;
	@apply p-4 m-6;
	@apply flex flex-col;
	background-color: rgb(244, 114, 182, 0.75);

	&__debug-info {
		@apply text-base text-black;
	}
	&__button {
		@apply w-fit h-fit p-3 bg-red-400 hover:bg-red-300 text-white;
	}
}
</style>
