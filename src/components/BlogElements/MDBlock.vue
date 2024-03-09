<template>
    <div v-html="markdown.render(sourceMDString)" />
</template>

<!-- Tales in md string and renders this MD file on a page -->
<!-- docs: -->
<!-- https://dev.to/matijanovosel/rendering-markdown-in-vue-3-3maj -->
<!-- https://github.com/markdown-it/markdown-it?tab=readme-ov-file#usage-examples -->
<script setup lang="ts">
import MarkdownIt from "markdown-it";
// import MarkdownItAbbr from "markdown-it-abbr"; // could not find declaration
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItFootnote from "markdown-it-footnote"; // could not find declaration but fixed
import MarkdownItHighlightjs from "markdown-it-highlightjs";
// import MarkdownItSub from "markdown-it-sub"; // could not find declaration
// import MarkdownItSup from "markdown-it-sup"; // could not find declaration
// import MarkdownItTasklists from "markdown-it-task-lists"; // could not find declaration but fixed
import MarkdownItTOC from "markdown-it-toc-done-right";

const markdown = new MarkdownIt()
    // .use(MarkdownItAbbr)
    .use(MarkdownItAnchor)
    .use(MarkdownItFootnote)
    .use(MarkdownItHighlightjs)
    // .use(MarkdownItSub)
    // .use(MarkdownItSup)
    // .use(MarkdownItTasklists)
    .use(MarkdownItTOC);

defineProps({
    sourceMDString: {
        type: String,
        required: true,
    },
});
</script>
