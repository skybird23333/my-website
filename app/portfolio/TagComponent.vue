<script setup>
import { getTag } from './portfolio-data';

const { data } = defineProps({
    data: {
        type: String,
        required: true,
    },
    highlighted: {
        type: Boolean,
        default: false,
    },
    clickable: {
        type: Boolean,
        default: false,
    }
})

const tagData = getTag(data);
</script>
<template>
    <span class="tag" :style="`background-color: ${tagData.color}`" :class="{highlighted: highlighted, clickable: clickable}">
        {{ tagData.name }}
    </span>
</template>

<style scoped>
.tag {
    display: inline-block;
    margin-bottom: 5px;
    transition: all 0.4s;
}

.highlighted {
    border-color: var(--foreground-primary);
    font-weight: bolder;
}

.clickable:hover {
    cursor: pointer;
}
</style>