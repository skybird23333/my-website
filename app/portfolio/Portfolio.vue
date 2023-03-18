<script setup>
import ButtonComponent from '../components/ButtonComponent.vue'
import ServiceComponent from './ServiceComponent.vue';
import { services } from './portfolio-data'
import { reactive, watch } from 'vue'
import ServicePageComponent from './ServicePageComponent.vue';
import PortfolioHeader from './PortfolioHeader.vue';
const state = reactive({
    selectedService: null,
    isPrintoutMode: false
})

watch(state, () => {
    if(state.isPrintoutMode) state.selectedService = null
})

defineProps({
    presence: {
        type: String
    }
})

</script>

<template>
    <div class="content">
        <div class="content-header">
            <Transition mode="out-in">

                <div v-if="state.selectedService">
                    <ButtonComponent @click="state.selectedService = null" type="primary">
                        &lt;- Back to Portfolio
                    </ButtonComponent>
                    <h1>{{state.selectedService.name}}</h1>
                    <div style="color: var(--foreground-secondary)">
                        {{ state.selectedService.pageDescription }}
                    </div>
                </div>
                <div v-else>
                    <PortfolioHeader :presence="presence"></PortfolioHeader>
                </div>
            </Transition>
        </div>
        <div class="content-content">
            <Transition mode="out-in">
                <div v-if="state.selectedService">
                    <ServicePageComponent :data="state.selectedService" :presence="presence"></ServicePageComponent>
                </div>
                <div v-else>
                    <h3>Stuff that I do</h3>
                    <ServiceComponent
                    v-for="data in services"
                    :key="data.name"
                    :data="data"
                    @click="state.selectedService = data"
                    :printout="state.isPrintoutMode"
                    ></ServiceComponent>
                        <ButtonComponent type="primary" @click="state.isPrintoutMode = true">
                            Switch to Printout Mode
                        </ButtonComponent>

                </div>
            </Transition>
        </div>
    </div>
</template>


<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.125s ease-out;
}

.v-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

</style>