export const services = [
    {
        name: 'Web Development',
        description: 'Building various applications using web technology',
        image: 'https://via.placeholder.com/96', //TODO:
        products: [
            {
                name: 'Admin panel',
            }
        ],
        tags: ['JS', 'Vue', 'React', 'NodeJS', 'Express', 'MongoDB', 'CSS', 'EJS'],
        skillsDescription: `
- Able to center a div without looking it up
- Several years self-taught experience in Javascript, HTML and CSS
- Experienced in usage of frameworks including VueJS and ReactJS.
- Applied experience creating front-end and full-stack web applications from scratch
- Full knowledge of HTTP, and REST API, competent in GraphQL
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
                subtitle: 'Commission',
                tags: ['Vue', 'CSS'],
            },
            {
                id: 'gradings-calculator-react',
                subtitle: 'Project Owner',
                tags: ['CSS', 'React'],
            },
        ]
    },
    {
        name: 'App Development',
        description: 'Building cross-platform mobile apps',
        image: 'https://via.placeholder.com/96', //TODO:
        products: [],
        tags: [],
        skillsDescription: `
- I own a macbook
- Competent in creating mobile apps using either Flutter or React Native
- Be able to automate and simplify the development process using CI/CD to build apps
- Full knowledge of HTTP, and REST API, competent in GraphQL
`
    },
    {
        name: 'Backend Development',
        description: 'Developing scalable and flexible backend services for any type of front-end',
        image: 'https://via.placeholder.com/96', //TODO:
        products: [],
        skillsDescription: `TODO:
`
    }
]

export const showcases = [
    {
        id: 'my-website',
        name: 'My Website',
        type: 'website', // website/server/mcaddon/ghrepo
        src: 'https://skybord.xyz',
        image: 'https://via.placeholder.com/96', //TODO:
        description: 'My personal full-stack blogging website written in EJS and VueJS with a CMS made from scratch. Source code available at the bottom of the page!',
    },
    {
        id: 'dubstep-website',
        name: 'dubstepsman.xyz',
        type: 'website', // website/server/mcaddon/ghrepo
        src: 'https://dubstepsman.xyz',
        image: 'https://via.placeholder.com/96', //TODO:
        description: 'Personal website of freelancing music producer dubstepman. Built from scratch with VueJS.',
    },
    {
        id: 'jand-web',
        name: 'JanD Web',
        type: 'ghrepo', // website/server/mcaddon/ghrepo
        src: 'https://github.com/skybird23333/jand-web',
        image: 'https://via.placeholder.com/96', //TODO:
        description: 'A web panel for the process manager JanD, with additional utilities.',
    },
    {
        id: 'gradings-calculator-react',
        name: 'Gradings Calculator React',
        type: 'ghrepo', // website/server/mcaddon/ghrepo
        src: 'https://github.com/skybird23333/grading-calculator-react',
        image: 'https://via.placeholder.com/96', //TODO:
        description: 'A graphical gradings calculator capable of precise calculations and providing predictions.',
    }
]

export const tags = [
    {
        name: 'EJS',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#bf9900' //TODO:
    },
    {
        name: 'JS',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#bf9900'
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
        name: 'MongoDB',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#2a6b24'
    },
    {
        name: 'CSS',
        iconUrl: 'https://via.placeholder.com/16',
        color: '#308c63'
    },
]

export const getTag = (name) => tags.find(tag => tag.name === name)