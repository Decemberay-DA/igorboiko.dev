<template>
    <DevDebugger />
    <div id="utils_container">
        <CursorBetrayalElement />
        <ThreeSceneBackground />
    </div>

    <div id="test-rows-stuff" class="grid grid-rows-4 gap-6">
        <div>Row 1</div>
        <div>Row 2</div>
        <div>Row 3</div>
        <div>Row 4</div>
        <h1>My Application of time</h1>
        <h1 class="text-blue-200">My Application of time</h1>
        <TestButton v-bind:button-text="'Click this fwking button!!'" />
        <h2 class="text-4xl font-bold text-center text-blue-500">
            My small tailwindish Application of Time
        </h2>

        <TestButton v-bind:button-text="'Yet another button lol!!'" />

        <div class="gap-3">
            <TestButton
                v-bind:button-text="'Floating button a'"
                id="Floating button a"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button b'"
                id="Floating button b"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button c'"
                id="Floating button c"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button d'"
                id="Floating button a"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button'"
                id="Floating button d"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button e'"
                id="Floating button e"
                class="pv-js-live-floating"
            />
        </div>
        <div class="gap-3">
            <TestButton
                v-bind:button-text="'Floating button a'"
                id="Floating button a"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button b'"
                id="Floating button b"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button c'"
                id="Floating button c"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button d'"
                id="Floating button a"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button'"
                id="Floating button d"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button e'"
                id="Floating button e"
                class="pv-js-live-floating"
            />
        </div>
        <div class="gap-3">
            <TestButton
                v-bind:button-text="'Floating button a'"
                id="Floating button a"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button b'"
                id="Floating button b"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button c'"
                id="Floating button c"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button d'"
                id="Floating button a"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button'"
                id="Floating button d"
                class="pv-js-live-floating"
            />
            <TestButton
                v-bind:button-text="'Floating button e'"
                id="Floating button e"
                class="pv-js-live-floating"
            />
        </div>

        <div class="flex flex-row gap-8">
            <RectangleWithText
                title="Test floating stuff A"
                text="text-4xl font-bold text-center text-blue-500 text-4xl font-bold text-center text-blue-500 text-4xl font-bold text-center text-blue-500"
                class="pv-js-live-floating"
            />
            <RectangleWithText
                title="Test floating stuff B"
                text="text-4xl font-bold text-center text-blue-500 text-4xl font-bold text-center text-blue-500 text-4xl font-bold text-center text-blue-500"
                class="pv-js-live-floating"
            />
            <RectangleWithText
                title="Test floating stuff C"
                text="text-4xl font-bold text-center text-blue-500 text-4xl font-bold text-center text-blue-500 text-4xl font-bold text-center text-blue-500"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
// utilities
import DevDebugger from "./scripts/DevUnilities/DevDebugger.vue";
import CursorBetrayalElement from "./scripts/MegaCursor/CursorBetrayalElement.vue";
import ThreeSceneBackground from "./scripts/ThreeJS/ThreeSceneBackground.vue";

import TestButton from "./components/TestButton.vue";
import RectangleWithText from "./components/RectangleWithText.vue";
</script>

<style>
@import "./assets/styles/styles.min.css";
</style>
