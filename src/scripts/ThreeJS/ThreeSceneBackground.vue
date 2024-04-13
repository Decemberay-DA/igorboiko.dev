<template>
	<div id="three_scene_backgroung" class="fixed top-0 left-0 w-full h-full"></div>
</template>

<script setup lang="ts">
import * as VUE from "vue";
import { TJ } from "./index";
import { Guid } from "../CommonUtilities";

const threeSceneBackground = VUE.ref<HTMLElement | null>(null);
let sceneInstance!: TJ.ThreeScene;

VUE.onMounted(() => {
	const element = document.getElementById("three_scene_backgroung");
	if (element) {
		element.id += `.${Guid.new()}`;
		TJ.ThreeScenesManager.BACKGROUND_SCENE.InitSetSceneMountLocation(element);
	} else {
		alert("three_scene_backgroung element wasn`t found");
	}
});
</script>
