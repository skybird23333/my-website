<script setup>
import TagComponent from './TagComponent.vue';
import TagComponentContainer from './TagComponentContainer.vue';


defineProps({
    data: {
        type: Object,
        required: true,
    },
    showcase: {
        type: Object,
        default: true,
    }
})
</script>

<template>
    <div class="display-grid showcase">
        <img :src="showcase.image" alt="showcase image" width="96"/>
        <div>
            <a class="link" :href="showcase.src">
                <b>{{ showcase.name }}</b> 
            </a>
            <div class="subtitle">{{ data.subtitle }}</div>
            <TagComponentContainer>
                <TagComponent v-for="tag in data.tags" :key="tag" :data="tag"></TagComponent>
            </TagComponentContainer>
            {{ showcase.description }}
        </div>
    </div>
</template>

<style scoped>
img {
    border-radius: 6px;
}

.subtitle {
    color: var(--foreground-secondary);
}

.showcase {
    padding-top: 1rem;
    padding-bottom: 1rem;
    overflow-wrap: normal;
}

.display-grid {
    display: grid;
    grid-template-columns: min-content auto;
    grid-gap: 5px;
}

@media screen and (max-width: 600px) {
    .display-grid {
        grid-template-columns: auto;
    }
}
</style>