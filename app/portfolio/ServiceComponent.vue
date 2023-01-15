<script setup>
defineProps({
    data: {
        type: Object,
        required: true,
    }
})
</script>
<template>
    <div class="card background display-grid">
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
</template>
<style scoped>
.card {
    transition: border-color 0.2s, filter 0.2s;
}

.card:hover {
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