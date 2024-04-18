<template lang="pug">
.flex.flex-row.w-full.h-fit.justify-center
    .flex.flex-row(class="w-3/5")
        h2.one-line-text About Me
        .w-24
        .w-full.h-fit.flex.flex-col.gap-6
            p Hello! My name is Igor i am very confident juniour developer (and sometimes also designer) and I enjoy creating things that combines some code and some art. My interest in it all initially started from 2015 when i first time opened blender 2.79. Since then I have got collage deegree in design and art and finished a loong front-end developer and Programmer cources.
            p I am only starting my carere and looking forward. Currently working at Aramco Innovetions as the one who mades some software.
            div.w-full.h-fit.flex.flex-col.gap-2
                p I`m also multitalanted and know pretty much everything. Here is only small, miniskiluous, slice of my techstack that i have been working with on the lase week:
                div.w-full.flex.flex-row.justify-between.gap-8
                    div.w-full
                        p.sol Software development
                        .h-2
                        p.sli > C# / Python
                        p.sli > Unity engine
                        p.sli > VR
                    div.w-full
                        p.sol Computer graphicks
                        .h-2
                        p.sli > Blender
                        p.sli > Unreal Engine 5
                        p.sli > Houdini
                        p.sli > HLSL / GLSL
                        p.sli > TOOLL3
                    div.w-full
                        p.sol Web development
                        .h-2
                        p.sli > Figma
                        p.sli > TypeScript
                        p.sli > Vue3
                        p.sli > THREE.ts
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import "@/styles/global.scss";

.sli {
	@apply pl-3;
}
.sol {
	@apply w-full text-GACTIVEABLE;
}
.developer-to-designer-gradient {
	position: relative;
	color: transparent;
	-webkit-background-clip: text;
	background-clip: text;
	@apply bg-gradient-to-r from-GACTIVERIGHT via-GWHITE to-GACTIVELEFT;
}
.developer-to-designer-gradient::before {
	content: attr(data-text);
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
	color: inherit;
}
</style>
