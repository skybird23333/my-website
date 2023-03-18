<script setup>
import ServicePageComponent from './ServicePageComponent.vue';

defineProps({
    data: {
        type: Object,
        required: true,
    },
    printout: {
        type: Boolean
    }
})
</script>
<template>
    <div class="card card-clickable background display-grid" v-if="!printout">
        <div>
            <span class="material-symbols-outlined" style="font-size: 36px">
                {{ data.icon }}
            </span>
        </div>
        <div>
            <b>{{ data.name }}</b>
            <div>
                {{ data.description }}
            </div>
            <div style="text-align:right; color: var(--foreground-secondary);">
                Read more...
            </div>
        </div>
    </div>
    <div class="card background" v-else>
        <div class="display-grid">
            <div>
                <span class="material-symbols-outlined" style="font-size: 36px">
                    {{ data.icon }}
                </span>
            </div>
            <div>
                <b>{{ data.name }}</b>
                <div>
                    {{ data.description }}
                </div>
            </div>
        </div>
        <ServicePageComponent
            :data="data"
            printout
        />
    </div>
</template>
<style scoped>
.card-clickable {
    filter: drop-shadow(3px 3px 2px black);
    transition: border-color 0.2s, filter 0.2s;
}

.card-clickable:hover {
    filter: drop-shadow(3px 3px 8px black);
    cursor: pointer;
    border-color: var(--foreground-primary);
}

.display-grid {
    display: grid;
    grid-template-columns: auto 2fr;
    grid-gap: 1rem;
}
</style>