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
        <img :src="showcase.image" alt="showcase image" />
        <div>
            <b>{{ showcase.name }}</b>
            <TagComponentContainer>
                <TagComponent v-for="tag in data.tags" :key="tag" :data="tag"></TagComponent>
            </TagComponentContainer>
            <div class="subtitle">{{ data.subtitle }}</div>
            {{ showcase.description }}
        </div>
    </div>
</template>

<style>
.subtitle {
    color: var(--foreground-secondary);
}

.showcase {
    margin-bottom: 1rem;
    padding: 1rem;
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