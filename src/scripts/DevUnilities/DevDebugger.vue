<!-- Shows debug data about current page -->
<template>
	<div class="c-debuger gap-1">
		<p class="c-debuger__debug-info">fps: {{ fps }}</p>
		<p class="c-debuger__debug-info">delta_time: {{ delta_time }}</p>
		<p class="c-debuger__debug-info">DO registered: {{ dynamick_objects_registered }}</p>
		<p class="c-debuger__debug-info">DO enabled: {{ dynamick_objects_enabled }}</p>
		<p class="c-debuger__debug-info">frame: {{ frame }}</p>
		<div class="flex flex-row gap-5">
			<button class="c-debuger__button" @click="alertPause">pause alert</button>
			<button class="c-debuger__button" @click="gameOnFrameUpdateToggle">pause game</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { GE } from "../GameEngine/index";
import { DO } from "../DinamicObjects/index";
import { Logger } from "./Logger";

const fps = ref(-6006);
const delta_time = ref(-6006);
const dynamick_objects_registered = ref(-6006);
const dynamick_objects_enabled = ref(-6006);
const frame = ref(-6006);

const alertPause = () => {
	alert("paused");
};
const gameOnFrameUpdateToggle = () => {
	if (GE.Game.getInstance().isEnabled) {
		GE.Game.getInstance().disable();
	} else {
		GE.Game.getInstance().enable();
	}
};

const updateDebugData = () => {
	fps.value = 1 / GE.GameTime.deltaTime;
	delta_time.value = GE.GameTime.deltaTime;
	dynamick_objects_registered.value = GE.Game.getInstance().dynamicObjects.length;
	dynamick_objects_enabled.value = GE.Game.getInstance().dynamicObjects.filter(
		(object) => object.isEnabled
	).length;
	frame.value = GE.GameTime.currentFrame;
};

onMounted(() => {
	const debugUpdater = new DO.AnonimousDynamicObject({
		onFrameUpdatePriority: GE.OnFrameUpdatePriorities.EARLY_FRAME_UPDATE,
		onFrameUpdate: function () {
			updateDebugData();
			Logger.write("AnonimousDynamicObject updated for debug desplay." + "fps: " + fps.value);
		},
	});
});
</script>

<style scoped lang="scss">
.c-debuger {
	@apply fixed top-0 left-0 w-1/5;
	@apply p-4 m-6;
	@apply flex flex-col;
	background-color: rgb(244, 114, 182, 0.75);

	&__debug-info {
		@apply text-black;
	}
	&__button {
		@apply w-full h-fit bg-red-400 hover:bg-red-300 text-white;
	}
}
</style>
