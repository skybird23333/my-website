<script setup>
import TagComponent from './TagComponent.vue';
import markdownit from 'markdown-it';
import ShowcaseComponent from './ShowcaseComponent.vue';
import { showcases } from './portfolio-data';
import TagComponentContainer from './TagComponentContainer.vue';
import { reactive } from 'vue';
import ClickToCopyComponent from './ClickToCopyComponent.vue';
const md = new markdownit()
md.set({breaks: true})

const { data, presence } = defineProps({
    data: {
        type: Object,
        required: true,
    },
    presence: {
        type: String
    }
})

console.log(presence)

const projectsFilter = reactive([])

const retrieveShowcases = () => {
    if (projectsFilter.length === 0) {
        return data.showcases;
    }
    return data.showcases.filter(showcase => 
        projectsFilter.every(tag => showcase.tags.includes(tag))
    );
}

const toggleFilter = (tag) => {
    if (projectsFilter.includes(tag)) {
        projectsFilter.splice(projectsFilter.indexOf(tag), 1);
    } else {
        projectsFilter.push(tag);
    }
}
</script>

<template>
    <div>
        <div class="card">
            <h3>My Skills</h3> 
            <div class="skills-description"
            v-html="md.render(data.skillsDescription || '') "
            ></div>
        </div>

        <div class="card" v-if="data.contactDescription">
            <h3>Contact me!</h3>
            <div>
                {{ data.contactDescription }}
            </div>
            <b>
                I'm currently <span :class="presence">{{ presence }}</span> on Discord!
            </b>
                    Friend me at 
                    <ClickToCopyComponent value="skybird2333#3209" />
                    and I will get back to you ASAP.

        </div>
        
        <div class="card">
            <h3>Check out my projects!</h3>
            <div class="card background">
            <TagComponentContainer>
                Filter by:
                    <TagComponent
                        v-for="tag in data.tags"
                        :key="tag.name"
                        :data="tag"
                        @click="toggleFilter(tag)"
                        :highlighted="projectsFilter.includes(tag)"
                        clickable
                    ></TagComponent>
                </TagComponentContainer>
                <div style="color: var(--foreground-secondary)">
                    (click on the tags)
                </div>
            </div>
            <ShowcaseComponent v-for="showcase in retrieveShowcases()" :key="showcase.name" :data="showcase" :showcase="showcases.find(s => s.id === showcase.id)"></ShowcaseComponent>
        </div>
    </div>
</template>

<style scoped>
.skills-description {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.online {
    color: green
}

.dnd {
    color: red
}

.idle {
    color: yellow
}

.offline {
    color: gray
}

</style>