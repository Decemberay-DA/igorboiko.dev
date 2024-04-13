<template>
	<div>
		<div id="DEFINED_LAYERS" class="DEFINED_LAYER">
			<div class="DEFINED_LAYER THREE_SPACE_SCENE_LAYER">
				<ThreeSceneBackground class="DEFINED_LAYER pointer-events-none z-[-9999999999] invisible" />
			</div>
			<div class="DEFINED_LAYER CURSOR_STAR_BACKGROUND_FOLLOWER_LAYER">
				<!-- <CursorBetrayalElement class="pointer-events-none invisible" /> -->
				<!-- <CursorBetrayalElement id="CursorBetrayalElement_0_background" /> -->
			</div>
			<div class="DEFINED_LAYER__scrollable-content CENTER_PAGE_CONTENT">
				<div class="DEFINED_SECTION INTRO_SECTION">
					<h1>INTRO_SECTION</h1>
				</div>
				<div class="DEFINED_SECTION LAND_SECTION">
					<h1>LAND_SECTION</h1>
				</div>
				<div class="DEFINED_SECTION ABOUT_SECTION">
					<h1>ABOUT_SECTION</h1>
				</div>
				<div class="DEFINED_SECTION PROJECTS_SECTION">
					<h1>PROJECTS_SECTION</h1>
				</div>
				<div class="DEFINED_SECTION EXPERIENCE_SECTION flex flex-col gap-8">
					<h1>EXPERIENCE_SECTION</h1>
					<ChangeCameraSceneButton class="w-full" />
				</div>
				<div class="DEFINED_SECTION EDUCATION_SECTION">
					<h1>EDUCATION_SECTION</h1>
				</div>
				<div class="DEFINED_SECTION COMMENT_SECTION">
					<h1>COMMENT_SECTION</h1>
				</div>
				<div class="DEFINED_SECTION CONTACT_SECTION">
					<h1>CONTACT_SECTION</h1>
				</div>
				<div class="DEFINED_SECTION ERROR_404_PAGE">
					<h1>ERROR_404_PAGE</h1>
				</div>
			</div>
			<div class="DEFINED_LAYER OPENED_SUBPAGE_LAYER"></div>
			<div class="DEFINED_LAYER CURSOR_STAR_FOREGROUND_FOLLOWER_LAYER">
				<!-- <CursorBetrayalElement_foreground class="pointer-events-none invisible" /> -->
			</div>
			<div class="DEFINED_LAYER FOREGROUND_PINNED_LAYER">
				<!-- <div class="DEFINED_LAYER__content"> -->
				<DevDebugger />
				<!-- </div> -->
			</div>
		</div>
		<!-- cursor follower test -->
		<div>
			<div
				class="relative w-6 h-6 flex-none origin-center bg-green-500 invisible"
				id="cursor_betreyal_backgroundStar.f1d545ae-f58e-4746-998a-243effeb900c"
			></div>
			<div
				class="relative w-2 h-2 flex-none origin-center bg-red-500 invisible"
				id="cursor_betreyal_foregroundStar.f1d525ae-f58e-4746-998a-243effeb900c"
			></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import DevDebugger from "./scripts/DevUnilities/DevDebugger.vue";
import CursorBetrayalElement from "./scripts/MegaCursor/CursorFollower/CursorBetrayalElement.vue";
import ThreeSceneBackground from "./scripts/ThreeJS/ThreeSceneBackground.vue";
import ChangeCameraSceneButton from "./scripts/CameraManagiment/Commands/ChangeCameraSceneButton.vue";
import CursorBetrayalElement_foreground from "./scripts/MegaCursor/CursorFollower/CursorBetrayalElement_foreground.vue";
</script>

<style scoped lang="scss">
@import "./assets/styles/styles.min.css";

.DEFINED_LAYER {
	// @apply fixed top-0 left-0 w-full h-screen;
	@apply w-full h-screen;
	@apply pointer-events-none bg-transparent;

	&__scrollable-content {
		@apply DEFINED_LAYER;
		@apply h-fit flex flex-col;
	}

	// apply to every childs
	& > * {
		@apply pointer-events-auto;
	}
}

.DEFINED_SECTION {
	@apply w-screen pointer-events-none bg-transparent;
	min-height: 600px;

	& > * {
		@apply pointer-events-auto;
	}
}

.pv-btn {
	width: 254px;
	height: 48px;
	color: white;
	background-color: black;

	&__square_icon {
		width: 48px;
		height: 48px;
	}

	&:hover {
		color: black;
		transition-duration: 0.1s;
		box-shadow: 3px 3px 0px 0px black;
	}
	&:active {
		color: black;
		transition-duration: 0.01s;
		box-shadow: 10px 10px 0px 0px black;
	}
}
</style>
