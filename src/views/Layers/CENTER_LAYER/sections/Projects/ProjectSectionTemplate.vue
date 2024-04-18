<template lang="pug">
div.flex.flex-col(class="gap-[120px]")

    ProjectCard(
    :title="'Motus Laserus '" 
    :titleLink="'https://www.artstation.com/artwork/8woJdw'"
    :description="'A gun i suppose. The more you look at it, the more pointless the handle is.'"
    :variation="1"
    :images="['https://cdnb.artstation.com/p/assets/images/images/048/958/013/large/ygor-1-main.jpg?1651351443', 'https://cdna.artstation.com/p/assets/images/images/048/958/018/large/ygor-2-main.jpg?1651350130', 'https://cdna.artstation.com/p/assets/images/images/048/958/026/large/ygor-5.jpg?1651350143']")

    ProjectCard(
    :title="'Battle Spider Unit'" 
    :titleLink="'https://www.artstation.com/artwork/b5xGdm'"
    :description="'In the original plan, it was supposed to be another gun.'"
    :variation="0"
    :images="['https://cdnb.artstation.com/p/assets/images/images/051/620/475/large/decemberay-d-a-main-2.jpg?1657743953', 'https://cdna.artstation.com/p/assets/images/images/051/622/260/large/decemberay-d-a-2-main.jpg?1657747840', 'https://cdnb.artstation.com/p/assets/images/images/051/621/797/large/decemberay-d-a-5.jpg?1657746709']")

    ProjectCard(
    :title="'Design College Graduation Project'" 
    :titleLink="'https://www.artstation.com/artwork/5vYl4P'"
    :description="'I was studying for a degree in design (in a wide sense of this word). The building was inspired by the artwork of architects working in the bionic and parametric styles, such as Zaha Hadid'"
    :variation="2"
    :images="['https://cdna.artstation.com/p/assets/images/images/064/095/262/large/decemberay-d-a-theslide-01.jpg?1687115335', 'https://cdna.artstation.com/p/assets/images/images/064/095/268/large/decemberay-d-a-theslide-02.jpg?1687115344', 'https://cdna.artstation.com/p/assets/images/images/064/095/278/large/decemberay-d-a-theslide-05.jpg?1687115372']")


</template>

<script setup lang="ts">
import ProjectCard from "./ProjectCard.vue";
</script>

<style lang="scss"></style>
