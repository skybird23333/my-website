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
        required: true,
    },
    printout: {
        type: Boolean
    }
})

</script>

<template>
    <div class="display-grid showcase">
        <div v-if="showcase.image">

            <img :src="showcase.image" alt="showcase image" width="96" >
        </div>
        <div v-else>
            <div class="tag">
                {{ showcase.type }}
            </div>
            <span class="material-symbols-outlined" style="font-size: 64px" v-if="showcase.type == 'website'">
                link
            </span>
            <i style="font-size: 64px" class="fa-brands fa-github" v-if="showcase.type == 'github'"></i>
            <i style="font-size: 64px" class="fa-brands fa-discord" v-if="showcase.type == 'server'"></i>
            <i style="font-size: 64px" class="fa-sharp fa-solid fa-cube" v-if="showcase.type == 'mcaddon'"></i>
        </div>
        <div>
            <a class="link" :href="showcase.src">
                <b>{{ showcase.name }}</b>
                <i v-if="printout">
                    {{ " " }}
                    {{ showcase.src }}
                </i>
                <span class="tag" v-if="showcase.image">
                    <span class="material-symbols-outlined" style="font-size: large" v-if="showcase.type == 'website'">
                        link
                    </span>
                    <i style="font-size: large" class="fa-brands fa-discord" v-if="showcase.type == 'server'"></i>
                    <span class="material-symbols-outlined" style="font-size: large" v-if="showcase.type == 'github'">
                        <i class="fa-brands fa-github"></i>
                    </span>
                    <i style="font-size: large" class="fa-sharp fa-solid fa-cube" v-if="showcase.type == 'mcaddon'"></i>
                    {{ showcase.type }}
                </span>
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
    width: 96px;
    border: none;
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