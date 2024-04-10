<template>
	<button @click="handleClick">Change scenes</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import asi from "../../asi/asi";
import { ChangeCameraSceneToRequested } from "./ChangeCameraSceneTo";

export default defineComponent({
	setup() {
		function handleClick() {
			const nexScene = asi.data.CAMERA_SCENES.nextScene;
			asi.mediator.publish(new ChangeCameraSceneToRequested(nexScene.name));
		}

		return {
			handleClick,
		};
	},
});
</script>
