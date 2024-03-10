<template>
    <div id="cursor_betreyal.f1d545ae-f58e-4746-998a-243effeb900c" class="base">
        <div class="vertical child -translate-y-1/2"></div>
        <div class="horizontal child -translate-x-1/2 translate-y-1/2"></div>
    </div>
</template>

<style scoped>
.base {
    @apply z-50 absolute flex-none origin-center pointer-events-none -translate-y-1/2;
}
.child {
    @apply relative flex-none bg-green-500 origin-center pointer-events-none;
}
.vertical {
    @apply w-2 h-48;
}
.horizontal {
    @apply w-48 h-2;
}
</style>
