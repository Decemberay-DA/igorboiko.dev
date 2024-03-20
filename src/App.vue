<template>
	<DevDebugger />
	<div id="utils_container">
		<CursorBetrayalElement />
		<ThreeSceneBackground />
	</div>

	<v-btn prepend-icon="$vuetify" variant="tonal" class="text-xl bg-red-600 hover:bg-red-700">
		Button
	</v-btn>
</template>

<script setup lang="ts">
// utilities
import DevDebugger from "./scripts/DevUnilities/DevDebugger.vue";
import CursorBetrayalElement from "./scripts/MegaCursor/CursorBetrayalElement.vue";
import ThreeSceneBackground from "./scripts/ThreeJS/ThreeSceneBackground.vue";
import FloatingElementsGrid from "./scripts/Testes/FloatingElementsGrid.vue";

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
</style>
