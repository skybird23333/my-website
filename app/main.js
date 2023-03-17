import { createApp } from 'vue'
import Portfolio from './portfolio/Portfolio.vue'
import ProjectsShowcase from './portfolio/ProjectsShowcase.vue'

// Efficient? no
// Maintainable? no
// Works? yes
window.vueComponents = {
    Portfolio,
    ProjectsShowcase
}

window.vueMethods = {
    createApp
}

console.log('Vue components injected')