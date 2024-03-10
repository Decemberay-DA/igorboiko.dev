<!-- Shows debug data about current page -->
<template>
    <div
        class="l-glued-top-line flex flex-row top-line-color justify-around gap-4"
    >
        <p class="debug-text">debug:</p>
        <p class="debug-text">fps: {{ fps }}</p>
        <p class="debug-text">delta_time: {{ delta_time }}</p>
        <p class="debug-text">
            dynamick_objects_registered: {{ dynamick_objects_registered }}
        </p>
        <p class="debug-text">
            dynamick_objects_enabled: {{ dynamick_objects_enabled }}
        </p>
        <p class="debug-text">frame: {{ frame }}</p>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { GE } from "../GameEngine/index";
import { DO } from "../DinamicObjects/index";
import { Logger } from "./Logger";

export default {
    setup() {
        const fps = ref(-6006);
        const deltaTime = ref(-6006);
        const dynamick_objects_registered = ref(-6006);
        const dynamick_objects_enabled = ref(-6006);
        const frame = ref(-6006);

        const updateDebugData = () => {
            fps.value = 1 / GE.GameTime.deltaTime;
            deltaTime.value = GE.GameTime.deltaTime;
            dynamick_objects_registered.value =
                GE.Game.getInstance().dynamicObjects.length;
            dynamick_objects_enabled.value =
                GE.Game.getInstance().dynamicObjects.filter(
                    (object) => object.isEnabled
                ).length;
            frame.value = GE.GameTime.currentFrame;
        };

        onMounted(() => {
            const debugUpdater = new DO.AnonimousDynamicObject({
                onFrameUpdatePriority:
                    GE.OnFrameUpdatePriorities.earlyFrameUpdate,
                onFrameUpdate: function () {
                    updateDebugData();
                    Logger.write(
                        "AnonimousDynamicObject updated for debug desplay"
                    );
                },
            });
        });

        return {
            fps,
            delta_time: deltaTime,
            dynamick_objects_registered,
            dynamick_objects_enabled,
            frame,
        };
    },
};
</script>

<style lang="css">
.top-line-color {
    background-color: rgb(244, 114, 182, 0.65);
}
.l-glued-top-line {
    @apply fixed top-0 left-0 w-full;
}
.debug-text {
    @apply text-base text-white;
}
</style>
