<template>
	<DevDebugger />
	<div id="utils_container">
		<CursorBetrayalElement />
		<ThreeSceneBackground />
	</div>

	<v-row class="mt-10 gap-9">
		<v-btn prepend-icon="$vuetify" variant="tonal" class="text-xl bg-red-600 hover:bg-red-400">
			v Button
		</v-btn>
		<v-btn class="bg-blue-200 hover:text-white hover:bg-blue-700 hover:rounded-full">
			tailwind Button
		</v-btn>
		<v-btn style="border-radius: 9999px" class="bg-blue-200 hover:text-white hover:bg-blue-700">
			tailwind corrected Button
		</v-btn>
		<v-btn class="btn-corrected"> corrected in scss Button </v-btn>
		<Button></Button>
		<button class="pv-btn">My scss button</button>
	</v-row>

	<div class="mt-10 gap-9">
		<Button></Button>
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
