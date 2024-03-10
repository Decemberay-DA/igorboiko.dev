<template>
    <div class="absolute flex flex-col">
        <FERow v-for="rowIndex in rows" :key="rowIndex" :boxes="boxesPerRow" />
    </div>
</template>

<script lang="ts">
// import { defineComponent } from "vue";
import FERow from "./FERow.vue";

export default {
    name: "FloatingElementsGrid",
    components: {
        FERow,
    },
    props: {
        rows: {
            type: Number,
            required: true,
        },
        boxesPerRow: {
            type: Number,
            required: true,
        },
    },
};
</script>
