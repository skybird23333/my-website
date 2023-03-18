<script setup>
const { presence } = defineProps({
    presence: {
        type: String,
        required: true
    }
})
</script>

<template>
    <img src="/img/pfp.png" alt='profile picture' width="60" class="profile-pic">
    <div style="display: inline-block; vertical-align: top; margin-left: 8px;">
        <h2 style="margin-block: 0;">
            <span class="discord-contact-label">
                <i class="fab fa-discord" style="color: #5865F2;"></i>
                skybird2333#3209
            </span>
            <span :class="`tag l-${presence}`">
                {{ presence }}
            </span>
        </h2>
        <b>
            Freelance developer
        </b>
    </div>
    <p>
        I make hobby projects and take commissions. Below are some of the stuff that I do and take commissions for, and a list of projects if you click into each one of them.
    </p>
</template>

<style>
@media only screen and (max-width: 600px) {
    .profile-pic {
        display: none;
    }
}

.discord-contact-label {
            padding: 3px;
            border-radius: 3px;
            display: inline-block;
        }

.l-online {
    background-color: #04AA6D;
}

/* Green */
.l-dnd {
    background-color: #ff0000;
}

.l-idle {
    background-color: #e6b839;
}

.l-offline {
    background-color: #3a3a3a;
}
</style>