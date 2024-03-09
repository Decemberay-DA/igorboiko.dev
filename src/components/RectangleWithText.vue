<template>
    <div class="card flex flex-col">
        <div class="bg-slate-400"></div>
        <h2 class="card__title font-bold text-center text-sm">{{ title }}</h2>
        <p class="card__description text-center">{{ text }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});
</script>
