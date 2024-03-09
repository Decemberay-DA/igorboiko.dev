<template>
    <h1>{{ headlineText }}</h1>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
    headlineText: String,
});
</script>
