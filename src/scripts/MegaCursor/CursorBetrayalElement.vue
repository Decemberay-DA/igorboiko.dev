<template>
    <div
        id="cursor_betreyal.f1d545ae-f58e-4746-998a-243effeb900c"
        class="z-50 absolute flex-none w-12 h-2 bg-green-500 animate-spin-slow origin-center pointer-events-none -translate-x-1/2 -translate-y-1/2"
    ></div>
</template>

<style scoped>
@keyframes spin {
    from {
        transform: rotate(0deg);
        /* @apply w-3; */
    }
    to {
        transform: rotate(180deg);
        /* @apply w-24; */
    }
}

.animate-spin-slow {
    /* animation: spin 1s linear infinite; */
}
</style>
