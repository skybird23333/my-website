<script setup>
import ButtonComponent from '../components/ButtonComponent.vue'
import ServiceComponent from './ServiceComponent.vue';
import { services } from './portfolio-data'
import { reactive } from 'vue'
import ServicePageComponent from './ServicePageComponent.vue';
const state = reactive({
    selectedService: null,
})

</script>

<template>
    <div class="content">
        <div class="content-header">
            <Transition mode="out-in">

                <div v-if="state.selectedService">
                    <ButtonComponent @click="state.selectedService = null">
                        Back
                    </ButtonComponent>
                    <h1>{{state.selectedService.name}}</h1>
                    Products include: 
                </div>
                <div v-else>
                    <h1>Services</h1>
                </div>
            </Transition>
        </div>
        <div class="content-content">
            <Transition mode="out-in">

                <div v-if="state.selectedService">
                    <ServicePageComponent :data="state.selectedService"></ServicePageComponent>
                </div>
                <div v-else>
                    <ServiceComponent
                    v-for="data in services"
                    :key="data.name"
                    :data="data"
                    @click="state.selectedService = data"
                    ></ServiceComponent>
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