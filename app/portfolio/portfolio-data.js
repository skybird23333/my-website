export const services = [
    {
        name: 'Web Development',
        description: 'Building various applications using web technology',
        pageDescription: 'Haha javascript bad',
        icon: 'language', //google material design

        contactDescription: 'Interested in getting yourself a portfolio website? Got an idea for an application? Happy to hear it out!',

        tags: ['JS', 'Vue', 'React', 'NodeJS', 'Express', 'MongoDB', 'CSS', 'EJS'],
        skillsDescription: `
- Able to center a div without looking it up
- Several years self-taught experience in Javascript, HTML and CSS
- Experienced in usage of frameworks including VueJS and ReactJS.
- Full knowledge of HTTP protocal and REST API, competent in GraphQL
- Applied experience creating front-end and full-stack web applications from ground up
- Competent in creating and maintaining Python Flask web apps
- Capable of designing User Interface for various scenarios such as data visualization and interaction
`,
        showcases: [
            {
                id: 'my-website',
                subtitle: 'Project Owner',
                tags: ['JS', 'Vue', 'NodeJS', 'Express', 'MongoDB', 'EJS', 'CSS'],
            },
            {
                id: 'jand-web',
                subtitle: 'Project Owner',
                tags: ['NodeJS', 'TypeScript', 'Express', 'Vue', 'CSS'],
            },
            {
                id: 'dubstep-website',
                subtitle: 'Featured Commission',
                tags: ['Vue', 'CSS'],
            },
            {
                id: 'gradings-calculator-react',
                subtitle: 'Project Owner',
                tags: ['CSS', 'React'],
            },
            {
                id: 'math-tools-vue',
                subtitle: 'Project Owner',
                tags: ['CSS', 'Vue'],
            },
            {
                id: 'blooklet-utility-mod',
                subtitle: 'Project Owner',
                tags: ['CSS', 'Vue'],
            },
        ]
    },
    {
        name: 'App Development',
        description: 'Building cross-platform mobile and desktop apps',
        pageDescription: 'Definitely not the same as Web Development',
        icon: 'smartphone',

        contactDescription: 'Got an idea for an app? Make it happen!',

        tags: [
            'Vue',
            'JS',
            'Electron',
            'React Native',
            'Flutter'
        ],

        showcases: [
            {
                id: 'corecoder/studio',
                subtitle: 'Major Contributor',
                tags: ['Vue', 'JS', 'Electron']
            },
            {
                id: 'corecoder/develop',
                subtitle: 'Major Contributor',
                tags: ['Flutter']
            }
        ],

        skillsDescription: `
- I own a macbook
- Competent in creating mobile apps using either Flutter or React Native
- Be able to automate and simplify the development process using CI/CD to build apps
- Full knowledge of HTTP protocal and REST API, competent in GraphQL
- Capable of designing User Interface for various scenarios such as data visualization and interaction
`
    },
    {
        name: 'Discord Bot Development',
        description: 'Developing various tools and experiences to spice Discord up.',
        icon: 'smart_toy',

        tags: [
            'Discord.js',
            'Discord.py',
            'MongoDB',
            'Script'
        ],

        showcases: [
            {
                id: 'ghost-pinger',
                subtitle: 'Project Owner',
                tags: ['Discord.js', 'Script']
            },
            {
                id: 'ateebplayz/disminer-bot',
                subtitle: 'Co-owner',
                tags: ['Discord.js', 'MongoDB']
            },
            {
                id: 'dot32/timer-bot',
                subtitle: 'Major Contributor',
                tags: ['Discord.js']
            },
        ],

        skillsDescription: `
- 5 Years expeience in creating Discord bots in either Javascript or Python
- Good knowledge in Discord Api, including Slash Commands, Webhooks, Roles, Members
- Applied experience in developing, managing and maintaining a Discord bot and building a community around it
`
    },
    {
        name: 'Translation',
        description: 'Translate between English and Chinese.',
        icon: 'translate',

        tags: [
            'Software',
            'Game',
            'Bot'
        ],
        showcases: [
            {
                id: 'dot32/timer-bot',
                subtitle: 'Full Contribution - Translation',
                tags: ['Bot']
            },
            {
                id: 'mat201757/phantoms-to-bombers',
                subtitle: 'Full Contribution - Translation',
                tags: ['Game']
            },
            {
                id: 'corecoder/studio',
                subtitle: 'Full Contribution - Translation',
                tags: ['Software']
            },
            {
                id: 'revolt/revoltchat',
                subtitle: 'Major Contributor - Translation',
                tags: ['Software']
            },
        ],

        skillsDescription: `
- Native Chinese speaker
- Studied English for 4+ years
- Applied experience in localizing apps
`
    },
    {
        name: 'Minecraft Content',
        description: 'Minecraft: Bedrock Edition add-ons.',
        icon: 'grid_view',

        tags: [
            'Add-on',
            'Function Pack',
        ],
        showcases: [
            {
                id: 'meds-addon',
                subtitle: 'Project Owner',
                tags: [
                    'Add-on'
                ]
            },
            {
                id: 'uhc-function-addon',
                subtitle: 'Project Owner',
                tags: [
                    'Function Pack'
                ]
            },
            {
                id: 'airdrop-addon',
                subtitle: 'Project Owner',
                tags: [
                    'Add-on'
                ]
            }
        ],

        skillsDescription: `
- Native Chinese speaker
- Studied English for 4+ years
- Applied experience in localizing apps
`
    }
]

export const showcases = [
    {
        id: 'my-website',
        name: 'My Website',
        type: 'website', // website/server/mcaddon/github
        src: 'https://skybord.xyz',
        description: 'My personal full-stack blogging website written in EJS and VueJS with a CMS made from scratch. Source code available at the bottom of the page!',
    },
    {
        id: 'dubstep-website',
        name: 'dubstepsman.xyz',
        type: 'website', // website/server/mcaddon/github
        src: 'https://dubstepsman.xyz',
        image: 'https://dubstepsman.xyz/favicon.ico',
        description: 'Personal website of freelancing music producer dubstepman. Built from scratch with VueJS.',
    },
    {
        id: 'jand-web',
        name: 'JanD Web',
        type: 'github', // website/server/mcaddon/github
        src: 'https://github.com/skybird23333/jand-web',
        description: 'A web panel for the process manager JanD, with additional utilities.',
    },
    {
        id: 'gradings-calculator-react',
        name: 'Gradings Calculator React',
        type: 'github', // website/server/mcaddon/github
        src: 'https://github.com/skybird23333/grading-calculator-react',
        description: 'A graphical gradings calculator capable of precise calculations and providing predictions.',
    },
    {
        id: 'math-tools-vue',
        name: 'Math Tools Vue',
        type: 'github', // website/server/mcaddon/github
        src: 'https://github.com/skybird23333/math-tools-vue',
        description: 'A simple vue app I made for my homework',
    },
    {
        id: 'blooklet-utility-mod',
        name: 'Blooket Utility Mod',
        type: 'github', // website/server/mcaddon/github
        src: 'https://github.com/skybird23333/blooklet-utility-mod',
        description: 'A mod menu for blooklet that shows you where the quiz is from and gives you all skins',
    },


    {
        id: 'ateebplayz/disminer-bot',
        name: 'Disminer',
        type: 'server', // website/server/mcaddon/github
        src: 'https://discord.gg/gDtrwUUDZT',
        image: 'https://cdn.discordapp.com/icons/837450770555076629/e93cc534c9627c1c18ccaa4312133f19.webp',
        description: 'Mine your way to to the top! A tycoon game experience in a Discord Bot.',
    },
    {
        id: 'corecoder/studio',
        name: 'Corecoder Studio',
        type: 'github', // website/server/mcaddon/github
        src: 'http://github.com/corecoder-devs/corecoder_studio',
        image: 'https://github.com/CoreCoder-Devs/CoreCoder-Studio/raw/main/src/resources/icon.png',
        description: 'IDE with built-in tools for building Minecraft content',
    },
    {
        id: 'corecoder/develop',
        name: 'Corecoder Develop',
        type: 'github', // website/server/mcaddon/github
        src: 'https://github.com/Hanprogramer/corecoder_develop/',
        image: 'https://github.com/Hanprogramer/corecoder_develop/raw/main/assets/logo.png',
        description: 'A cross platform IDE for Mobile and Desktop ',
    },

    {
        id: 'dot32/timer-bot',
        name: 'Timer Bot',
        type: 'github', // website/server/mcaddon/github
        src: 'https://github.com/Dot32IsCool/timer_bot',
        image: 'https://cdn.discordapp.com/avatars/1040831863381557321/084b691310cfbf84307f779ac7a01a3f.webp',
        description: 'Create Discord timers with ease, and set reminders.',
    },
    {
        id: 'ghost-pinger',
        name: 'Ghost Pinger',
        type: 'github', // website/server/mcaddon/github
        src: 'https://github.com/skybird23333/ghost-pinger',
        image: 'https://via.placeholder.com/96',
        description: 'Annoy specific people and create chaos',
    },


    {
        id: 'revolt/revoltchat',
        name: 'Revolt Chat',
        type: 'github',
        src: 'https://github.com/revoltchat/revolt',
        image: 'https://revolt.chat/favicon.ico',
        description: '"hell" - @lea_'
    },
    {
        id: 'mat201757/phantoms-to-bombers',
        name: 'Phantoms To Bombers',
        type: 'website',
        src: 'https://www.planetminecraft.com/texture-pack/phantoms-to-bombers/',
        image: 'https://static.planetminecraft.com/files/image/minecraft/texture-pack/2022/924/15388359_l.webp',
        description: 'Replaces Minecraft phantoms with bomber jets.'
    },

    {
        id: 'uhc-function-addon',
        name: 'UHC Function Addon',
        type: 'github',
        src: 'https://github.com/skybird23333/mc-bedrocc-UHC-function',
        image: 'https://github.com/skybird23333/mc-bedrocc-UHC-function/raw/master/pack_icon.png',
        description: 'Host a UHC match with ease using this utility-packed add-on.'
    },
    {
        id: 'meds-addon',
        name: 'Meds Addon',
        type: 'mcaddon',
        src: 'https://mcpedl.com/meds-addon/',
        image: '/img/addons/meds.png',
        description: 'Adds craftable meds to Minecraft.'
    },
    {
        id: 'airdrop-addon',
        name: 'Airdrop Addon',
        type: 'mcaddon',
        src: 'https://mcpedl.com/airdrop-addon/',
        image: '/img/addons/airdrop.png',
        description: 'Adds airdrops to Minecraft. Flare gun included.'
    },
]

export const tags = [
    {
        name: 'Function Pack',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#333333'
    },
    {
        name: 'Add-on',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#333333'
    },
    {
        name: 'Script',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#333333'
    },
    {
        name: 'Software',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#a01c4c'
    },
    {
        name: 'EJS',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#a01c4c'
    },
    {
        name: 'JS',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#bf9900'
    },
    {
        name: 'Game',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#007acc'
    },
    {
        name: 'TypeScript',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#007acc'
    },
    {
        name: 'Vue',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#308c63'
    },
    {
        name: 'React',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#3c8a9e'
    },
    {
        name: 'React Native',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#3c8a9e'
    },
    {
        name: 'Flutter',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#085698'
    },
    {
        name: 'NodeJS',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#467042'
    },
    {
        name: 'Express',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#8b8b8b'
    },
    {
        name: 'Electron',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#6a9ea8'
    },
    {
        name: 'MongoDB',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#2a6b24'
    },
    {
        name: 'CSS',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#563d7c'
    },
    {
        name: 'Discord.py',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#968e3f'
    },
    {
        name: 'Python',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#264966'
    },
    {
        name: 'Discord.js',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#3f48ab'
    },
    {
        name: 'Bot',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#3f48ab'
    },
]

export const getTag = (name) => tags.find(tag => tag.name === name)