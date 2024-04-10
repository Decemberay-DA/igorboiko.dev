<template>
	<DevDebugger />
	<div id="utils_container">
		<CursorBetrayalElement />
		<ThreeSceneBackground />
	</div>
	<ChangeCameraSceneButton class="w-full" />
</template>

<script setup lang="ts">
// utilities
import DevDebugger from "./scripts/DevUnilities/DevDebugger.vue";
import CursorBetrayalElement from "./scripts/MegaCursor/CursorFollower/CursorBetrayalElement.vue";
import ThreeSceneBackground from "./scripts/ThreeJS/ThreeSceneBackground.vue";

import Button from "./components/Common/Button.vue";

// CommonPage

import TestButton from "./components/TestButton.vue";
import RectangleWithText from "./components/RectangleWithText.vue";
import type asi from "./scripts/asi/asi";
import ChangeCameraSceneButton from "./scripts/CameraManagiment/Commands/ChangeCameraSceneButton.vue";
</script>

<style lang="scss">
@import "./assets/styles/styles.min.css";
@import "src/scripts/DinamicObjects/FloatingElements.css";

.pv-js-live-floating-subject {
	content: "";
}

.pv-btn {
	// @extend .h3;

	width: 254px;
	height: 48px;
	color: white;
	background-color: black;

	&__square_icon {
		// @extend .button;
		width: 48px;
		height: 48px;
	}

	&:hover {
		// @extend .white-with-hard-shadow;
		color: black;
		transition-duration: 0.1s;
		box-shadow: 3px 3px 0px 0px black;
	}
	&:active {
		// @extend .white-with-hard-shadow;
		color: black;
		transition-duration: 0.01s;
		box-shadow: 10px 10px 0px 0px black;
	}
}
</style>
