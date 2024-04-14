<template>
	<!-- 3d background THREE_SPACE_SCENE_LAYER -->
	<div id="THREE_SPACE_SCENE_LAYER" class="THREE pointer-events-none">
		<ThreeSceneBackground class="DEFINED_LAYER z-[-9999999999]" />
	</div>

	<!-- SCROLLABLE SECTIONS THEMSELVES -->
	<div id="CENTER_LAYER" class="SECTION__sidescreen-conteiner">
		<!-- <div class="flex flex-col"> -->
		<!-- <div class="SECTION__topscreen-spaceholder"></div> -->
		<!-- <div class="SECTION__topscreen-spaceholder"></div> -->
		<!-- </div> -->
		<!-- <div class="SECTION__sidescreen-spaceholder"></div> -->
		<div class="p-20">
			<div class="SECTION__inner-container flex-shrink">
				<div id="INTRO_SECTION" class="SECTION h-fi GLASS--rought">
					<h1>INTRO_SECTION</h1>
				</div>
				<div id="LAND_SECTION" class="SECTION GLASS--transparent">
					<h1>LAND_SECTION</h1>
				</div>
				<div id="ABOUT_SECTION" class="SECTION">
					<h1>ABOUT_SECTION</h1>
				</div>
				<div id="PROJECTS_SECTION" class="SECTION GLASS--transparent">
					<h1>PROJECTS_SECTION</h1>
				</div>
				<div id="EXPERIENCE_SECTION" class="SECTION">
					<h1>EXPERIENCE_SECTION</h1>
					<ChangeCameraSceneButton class="w-full" />
					<ChangeCameraSceneButton class="w-full" />
				</div>
				<div id="EDUCATION_SECTION" class="SECTION GLASS--transparent">
					<h1>EDUCATION_SECTION</h1>
				</div>
				<div id="COMMENT_SECTION" class="SECTION">
					<h1>COMMENT_SECTION</h1>
					<ChangeCameraSceneButton />
				</div>
				<div id="CONTACT_SECTION" class="SECTION GLASS--transparent">
					<h1>CONTACT_SECTION</h1>
				</div>
				<div id="ERROR_404_PAGE" class="SECTION">
					<h1>ERROR_404_PAGE</h1>
				</div>
			</div>
		</div>

		<!-- <div class="SECTION__sidescreen-spaceholder"></div> -->
	</div>

	<!-- FIXED NAVIGATIONAL BAAR -->
	<div id="NAVIGATION_LAYER" class="NAV pointer-events-none">
		<div class="absolute left-0 top-0">
			<div class="h-20 w-20 flex items-center justify-center">
				<div class="h-10 w-10 bg-black allign-center"></div>
			</div>
		</div>
		<!-- navifation buttons -->
		<div class="absolute right-0 top-0">
			<div class="h-20 w-20 flex items-center justify-center">
				<div class="h-fit gap-10 w-20 flex flex-row-reverse pointer-events-auto">
					<p
						class="interactible"
						@click="navButtonScrollToSection(asi.data.DefinedSections.INTRO_SECTION.name)"
					>
						00. Intro
					</p>
					<p
						class="interactible"
						@click="navButtonScrollToSection(asi.data.DefinedSections.LAND_SECTION.name)"
					>
						01. Main
					</p>
					<p
						class="interactible"
						@click="navButtonScrollToSection(asi.data.DefinedSections.ABOUT_SECTION.name)"
					>
						02. About
					</p>
					<p
						class="interactible"
						@click="navButtonScrollToSection(asi.data.DefinedSections.PROJECTS_SECTION.name)"
					>
						03. Projects
					</p>
					<p
						class="interactible"
						@click="navButtonScrollToSection(asi.data.DefinedSections.EXPERIENCE_SECTION.name)"
					>
						04. Experience
					</p>
					<p
						class="interactible"
						@click="navButtonScrollToSection(asi.data.DefinedSections.EDUCATION_SECTION.name)"
					>
						05. Education
					</p>
					<p
						class="interactible"
						@click="navButtonScrollToSection(asi.data.DefinedSections.COMMENT_SECTION.name)"
					>
						06. Comments
					</p>
					<p
						class="interactible"
						@click="navButtonScrollToSection(asi.data.DefinedSections.CONTACT_SECTION.name)"
					>
						07. Contact
					</p>
					<p
						class="interactible"
						@click="navButtonScrollToSection(asi.data.DefinedSections.ERROR_404_PAGE.name)"
					>
						08. ERROR
					</p>
				</div>
				<div class="h-10 w-10 bg-black allign-center"></div>
			</div>
		</div>
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
	</div>

	<!--   -->
	<div id="compatability shit">
		<div id="cursor_betreyal_foregroundStar"></div>
		<div id="cursor_betreyal_backgroundStar"></div>
	</div>
</template>

<script setup lang="ts">
import ThreeSceneBackground from "./scripts/ThreeJS/ThreeSceneBackground.vue";
import ChangeCameraSceneButton from "./scripts/CameraManagiment/Commands/ChangeCameraSceneButton.vue";
import { ScrollToSectionCoroutined } from "./scripts/CameraManagiment/Commands/ScrollToSectionCoroutined";
import { asi } from "./scripts/asi/asi";

const navButtonScrollToSection = (sectionName: string) =>
	ScrollToSectionCoroutined.instance.launchTransitionCoroutine(sectionName);
</script>

<style lang="scss">
@import "./assets/styles/styles.min.css";
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
// Text styles ========-====-====-====-============
// ========-====-====-====-============ ========-====-====-====-============
._font_base {
	color: #777777;
}
._Montserrat {
	font-family: Montserrat, Arial, sans-serif;
}
._Helvetica {
	font-family: Helvetica, Arial, sans-serif;
}

p {
	@apply _font_base _Montserrat;
	font-size: 18px;
	font-weight: normal;
	line-height: 10%;
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

.link {
	color: blue;
	&:hover {
		color: cyan;
	}
}
.interactible {
	color: red;
	&:hover {
		color: pink;
	}
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
.bg-noise {
	background-image: url("/img/noise-texture.png"),
		linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3));
	filter: brightness(1.2) contrast(1.2);
}
// ========-====-====-====-============ ========-====-====-====-============
// DEFINED_LAYERS ========-====-====-====-============
// ========-====-====-====-============ ========-====-====-====-============

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

// ========-====-====-====-============ ========-====-====-====-============
// testes ========-====-====-====-============
// ========-====-====-====-============ ========-====-====-====-============
.dev {
	&__border {
		@apply border-solid border-x-8 border-y-8 border-blue-500;
	}
}
</style>
