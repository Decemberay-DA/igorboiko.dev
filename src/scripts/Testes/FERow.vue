<template>
	<div class="flex flex-row">
		<div class="c-floating-box pv-js-live-floating-subject" v-for="index in boxes" :key="index"></div>
	</div>
</template>

<script lang="ts">
// import { defineComponent } from "vue";

export default {
	name: "FERow",
	props: {
		boxes: {
			type: Number,
			required: true,
		},
	},
};
</script>

<style scoped lang="scss">
.pv-js-live-floating-subject {
	content: "";
}
.c-floating-box {
	@apply size-1 bg-blue-200;
	@apply rounded-full;
}
</style>

<!-- lol
<script lang="glsl">
uniform float time;
uniform vec3 colorOfLines;
void main() {
    float sineWave = sin(position.x * 10.0 + time * 5.0) * 0.5 + 0.5;
    gl_FragColor = vec4(vec3(sineWave) * colorOfLines, 1.0);
}
</script> -->
