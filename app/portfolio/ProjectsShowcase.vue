<script setup>
import { getShowcaseShowcases } from './portfolio-data';
import ShowcaseComponent from './ShowcaseComponent.vue'
console.log(getShowcaseShowcases())
</script>

<template>
    <showcase-component
        v-for="showcase in getShowcaseShowcases()"
        :showcase="showcase"
        :data="{subtitle: showcase.defaultSubtitle, tags: []}"
        :key="showcase.id"
    ></showcase-component>
    ...and those are just like, what, 5% of the projects i've done?<br>
    Check out my <a class=link href="/portfolio">Portfolio</a> now for a more detailed list!
</template>


<style>

</style>