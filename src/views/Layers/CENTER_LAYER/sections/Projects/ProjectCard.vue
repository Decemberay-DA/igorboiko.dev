<template lang="pug">
div.frame
    .Variation.var(v-if="variation === 0")
        div.PANEL.PANNEL--white
        div.clss.div.PANNEL--gray
        div.PANEL-2.PANNEL--white
        div.GLASS.GLASS--transparent
        div.GLASS-2.GLASS--rought
        img.IMAGE-0.hup(:src="images[0]")
        img.IMAGE-2.hup(:src="images[1]")
        img.IMAGE-3.hup(:src="images[2]")
        div.div-2.Text-space
            a.title-linked(:href="titleLink" target="_blank" class="h2") {{ title }}
            p {{ description }}
    .Variation.oerlap-wrapper(v-if="variation === 1")
        div.PANEL-3.PANNEL--gray
        div.PANEL-4.PANNEL--gray
        div.PANEL-5.PANNEL--white
        div.GLASS-3.GLASS--transparent
        div.GLASS-4.GLASS--rought
        img.IMAGE-4.hup(:src="images[0]")
        img.IMAGE-5.hup(:src="images[1]")
        img.IMAGE-6.hup(:src="images[2]")
        div.div-3.Text-space
            a.title-linked(:href="titleLink" target="_blank" class="h2") {{ title }}
            p {{ description }}
    .Variation.oerlap-group-wrapper(v-if="variation === 2")
        div.PANEL-6.PANNEL--white
        div.PANEL-7.PANNEL--white
        div.PANEL-8.PANNEL--gray
        div.GLASS-5.GLASS--rought
        div.GLASS-6#ug.GLASS--transparent
        div.GLASS-7.GLASS--transparent
        img.IMAGE-7.hup(:src="images[0]")
        img.IMAGE-8.hup(:src="images[1]")
        img.IMAGE-9.hup(:src="images[2]")
        div.div-4.Text-space
            a.title-linked(:href="titleLink" target="_blank" class="h2") {{ title }}
            p {{ description }}
</template>
<script setup lang="ts">
import { defineProps, type PropType } from "vue";

type TVariations = 0 | 1 | 2;

const props = defineProps({
	title: {
		type: String,
		required: true,
	},
	titleLink: {
		type: String,
		required: false,
	},
	description: {
		type: String,
		required: false,
		default: "no description",
	},
	variation: {
		type: Number,
		required: false,
		default: 0,
	},
	images: {
		type: Array as PropType<string[]>,
		required: false,
	},
});
</script>

<style scoped lang="scss">
@import "@/styles/global.scss";

.hup {
	@apply ANIM--hover-up;
}

.Variation {
	@apply Fixed-groupe;
}
.title-linked {
	@apply interactible--hilighted;
}
.Fixed-groupe {
	@apply h-[800px] w-[1200px] relative;
}
.Text-space {
	@apply flex flex-col gap-6;
}
</style>

<style scoped lang="css">
.frame {
	align-items: center;
	display: inline-flex;
	flex-direction: column;
	/* gap: 202px; */
	position: relative;
}

.frame .var {
	height: 729px;
	position: relative;
	width: 1372px;
}

/* .frame .overlap-group {
	height: 729px;
	position: relative;
} */

.frame .PANEL {
	/* background-color: #d9d9d9; */
	height: 250px;
	left: 0;
	position: absolute;
	top: 293px;
	width: 640px;
}

.frame .div {
	/* background-color: #d9d9d9; */
	height: 391px;
	left: 762px;
	position: absolute;
	top: 222px;
	width: 401px;
}

.frame .PANEL-2 {
	/* background-color: #d9d9d9; */
	height: 152px;
	left: 551px;
	position: absolute;
	top: 78px;
	width: 416px;
}

.frame .GLASS {
	/* background-color: #7e7e7e; */
	height: 250px;
	left: 539px;
	position: absolute;
	top: 29px;
	width: 833px;
}

.frame .GLASS-2 {
	/* background-color: #7e7e7e; */
	height: 161px;
	left: 539px;
	position: absolute;
	top: 568px;
	width: 412px;
}

.frame .IMAGE-0 {
	/* background-color: #ec2d2d; */
	height: 380px;
	left: 42px;
	position: absolute;
	top: 0;
	width: 675px;
}

.frame .IMAGE-2 {
	/* background-color: #ec2d2d; */
	height: 277px;
	left: 795px;
	position: absolute;
	top: 222px;
	width: 492px;
}

.frame .IMAGE-3 {
	/* background-color: #ec2d2d; */
	height: 277px;
	left: 282px;
	position: absolute;
	top: 418px;
	width: 492px;
}

.frame .div-2 {
	/* align-items: flex-start;
	display: flex;
	flex-direction: column; */
	gap: 12px;
	left: 807px;
	position: absolute;
	top: 55px;
	width: 508px;
}

/* .frame .text-wrapper {
	align-self: stretch;
	color: #ffffff;
	font-family: var(--h1-font-family);
	font-size: var(--h1-font-size);
	font-style: var(--h1-font-style);
	font-weight: var(--h1-font-weight);
	letter-spacing: var(--h1-letter-spacing);
	line-height: var(--h1-line-height);
	margin-top: -1px;
	position: relative;
} */

/* .frame .p {
	align-self: stretch;
	color: #ffffff;
	font-family: var(--p-font-family);
	font-size: var(--p-font-size);
	font-style: var(--p-font-style);
	font-weight: var(--p-font-weight);
	letter-spacing: var(--p-letter-spacing);
	line-height: var(--p-line-height);
	position: relative;
} */

.frame .overlap-wrapper {
	height: 753px;
	position: relative;
	width: 1372px;
}

.frame .overlap {
	height: 753px;
	position: relative;
}

.frame .PANEL-3 {
	/* background-color: #d9d9d9; */
	height: 250px;
	left: 0;
	position: absolute;
	top: 59px;
	width: 640px;
}

.frame .PANEL-4 {
	/* background-color: #d9d9d9; */
	height: 391px;
	left: 545px;
	position: absolute;
	top: 129px;
	width: 415px;
}

.frame .PANEL-5 {
	/* background-color: #d9d9d9; */
	height: 152px;
	left: 39px;
	position: absolute;
	top: 274px;
	width: 416px;
}

.frame .GLASS-3 {
	/* background-color: #7e7e7e; */
	height: 336px;
	left: 826px;
	position: absolute;
	top: 0;
	width: 546px;
}

.frame .GLASS-4 {
	/* background-color: #7e7e7e; */
	height: 272px;
	left: 306px;
	position: absolute;
	top: 416px;
	width: 412px;
}

.frame .IMAGE-4 {
	/* background-color: #ec2d2d; */
	height: 391px;
	left: 640px;
	position: absolute;
	top: 362px;
	width: 695px;
}

.frame .IMAGE-5 {
	/* background-color: #ec2d2d; */
	height: 277px;
	left: 793px;
	position: absolute;
	top: 59px;
	width: 492px;
}

.frame .IMAGE-6 {
	/* background-color: #ec2d2d; */
	height: 277px;
	left: 94px;
	position: absolute;
	top: 362px;
	width: 492px;
}

.frame .div-3 {
	/* align-items: flex-start;
	display: flex;
	flex-direction: column; */
	gap: 12px;
	left: 78px;
	position: absolute;
	top: 129px;
	width: 508px;
}

.frame .overlap-group-wrapper {
	height: 710px;
	position: relative;
	width: 1355px;
}

.frame .overlap-2 {
	height: 710px;
	position: relative;
}

.frame .PANEL-6 {
	/* background-color: #d9d9d9; */
	height: 256px;
	left: 434px;
	position: absolute;
	top: 351px;
	width: 741px;
}

.frame .PANEL-7 {
	/* background-color: #d9d9d9; */
	height: 518px;
	left: 178px;
	position: absolute;
	top: 0;
	width: 415px;
}

.frame .PANEL-8 {
	/* background-color: #d9d9d9; */
	height: 221px;
	left: 0;
	position: absolute;
	top: 463px;
	width: 416px;
}

.frame .GLASS-5 {
	/* background-color: #7e7e7e; */
	height: 336px;
	left: 764px;
	position: absolute;
	top: 15px;
	width: 546px;
}

.frame .GLASS-6 {
	/* background-color: #7e7e7e; */
	height: 272px;
	left: 179px;
	position: absolute;
	top: 438px;
	width: 412px;
}

.frame .GLASS-7 {
	/* background-color: #7e7e7e; */
	height: 193px;
	left: 652px;
	position: absolute;
	top: 261px;
	width: 703px;
}

.frame .IMAGE-7 {
	/* background-color: #ec2d2d; */
	height: 303px;
	left: 86px;
	position: absolute;
	top: 342px;
	width: 390px;
}

.frame .IMAGE-8 {
	/* background-color: #ec2d2d; */
	height: 277px;
	left: 35px;
	position: absolute;
	top: 23px;
	width: 492px;
}

.frame .IMAGE-9 {
	/* background-color: #ec2d2d; */
	height: 277px;
	left: 568px;
	position: absolute;
	top: 92px;
	width: 716px;
}

.frame .div-4 {
	/* align-items: flex-start;
	display: flex;
	flex-direction: column; */
	/* gap: 12px; */
	left: 566px;
	position: absolute;
	top: 438px;
	width: 508px;
}
</style>
