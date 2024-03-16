<template>
	<div id="three_scene_backgroung" class="fixed top-0 left-0 w-full h-screen z-[-9999999999999999]"></div>
</template>

<script lang="ts">
import * as VUE from "vue";
import { TJ } from "./index";
import { Guid } from "../CommonUtilities";

export default {
	name: "ThreeSceneBackground",
	setup() {
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

		return {
			threeSceneBackground,
			sceneInstance,
		};
	},
};
</script>
<!-- .788320a9-5a74-4ab4-83c8-09ebb725c294 -->
