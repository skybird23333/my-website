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
            <img
                :src="data?.image || 'https://via.placeholder.com/64'"
                width="48"
                :alt="data.name"
                class="card-image"
            >
        </div>
        <div>
            <b>{{data.name}}</b>
            <div>
                {{data.description}}
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