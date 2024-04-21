<template lang="pug">
div(id="three_scene_backgroung" class="fixed top-0 left-0 w-full h-full z-[-9999999999]")
</template>

<script setup lang="ts">
import * as VUE from "vue";
import { TJ } from "..";

const threeSceneBackground = VUE.ref<HTMLElement | null>(null);
let sceneInstance!: TJ.ThreeScene;

VUE.onMounted(() => {
	const element = document.getElementById("three_scene_backgroung");
	if (element) {
		element.id += `.` + generateRandomString(15);
		TJ.ThreeScenesManager.BACKGROUND_SCENE.InitSetSceneMountLocation(element);
	} else {
		alert("three_scene_backgroung element wasn`t found");
	}
});

function generateRandomString(length: number): string {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}
</script>
