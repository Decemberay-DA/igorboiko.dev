<template>
    <button class="my-button" @click="handleClick">{{ buttonText }}</button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
    buttonText: {
        type: String,
        required: true,
    },
});

const handleClick = () => {
    alert(`Button with name ${props.buttonText} clicked!`);
};
</script>
