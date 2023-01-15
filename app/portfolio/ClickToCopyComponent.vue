<script setup>
import { ref, reactive } from 'vue';

const state = reactive({
    copied: false
})

defineProps({
    value: {
        type: String,
        required: true
    }
})

const input = ref(null)

const copy = () => {
    // Select the text field
    input.value.select();
    input.value.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(input.value.value);

    state.copied = true
}

</script>

<template>

    <div class="tooltip" @mouseenter="state.copied = false">
        <div class="tooltiptext">
            {{
                state.copied ?
                        "Copied!":
                    "Click to copy!"
            }}
        </div>
        <div class="button" @click="copy">
            <input :value="value" ref="input" readonly>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
input {
    background: inherit;
    color: inherit;
    border: none;
    outline: none;
}

.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    border: 1px solid var(--foreground-border);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>