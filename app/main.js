import { createApp } from 'vue'
import Portfolio from './portfolio/Portfolio.vue'

// Efficient? no
// Maintainable? no
// Works? yes
window.vueComponents = {
    Portfolio
}

window.vueMethods = {
    createApp
}

console.log('Vue components injected')