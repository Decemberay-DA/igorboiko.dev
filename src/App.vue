<template>
	<DevDebugger />
	<div id="utils_container">
		<CursorBetrayalElement />
		<ThreeSceneBackground />
	</div>
</template>

<script setup lang="ts">
// utilities
import DevDebugger from "./scripts/DevUnilities/DevDebugger.vue";
import CursorBetrayalElement from "./scripts/MegaCursor/CursorBetrayalElement.vue";
import ThreeSceneBackground from "./scripts/ThreeJS/ThreeSceneBackground.vue";
import FloatingElementsGrid from "./scripts/Testes/FloatingElementsGrid.vue";

import Button from "./components/Common/Button.vue";

// CommonPage
import Header from "./components/CommonPage/Header.vue";
import Futer from "./components/CommonPage/Futer.vue";

import TestButton from "./components/TestButton.vue";
import RectangleWithText from "./components/RectangleWithText.vue";
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
