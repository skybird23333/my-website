const express = require('express')
const Router = new express.Router()

const discordService = require('../discord/index')
const databaseService = require('../database/index')

const routerAdmin = require('./admin');
const postManager = require('../database/posts');
const generatePostContent = require('../util/generate-post-content');

const getVueAssetsHTML = require('../util/get-vue-assets-html')

Router.get('/posts/:id', async (req, res) => {
    
    let post = await postManager.getPost(req.params.id);
    if(!post) {
        return res.status(404).render('notFound')
    }
    
    const contents = generatePostContent(post.content)
    
    res.render('post', { post, contents })

})

Router.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

Router.get('/search', (req, res) => {
    res.render('search', {
        query: decodeURI(req.query.query)
    })
})

Router.get('/feedback', (req, res) => {
    if (req.query.message && req.query.message.length > 0 && req.query.email && req.query.email.length > 0) {
        discordService.postFeedbackMessage(req.query.message, req.query.email)
        res.render('feedback', {
            feedback: {
                message: "amogus"
            }
        })
    } else {
        res.render('feedback', { feedback: null })
    }
})

Router.get('/tags/:tag', async (req, res) => {
    const postList = await postManager.getPosts({tag: req.params.tag})

    res.render('tags', {
        tagQuery: req.params.tag,
        postList
    })
})

Router.get('/release-test', (req, res) => {
    res.render('release')
})

Router.get('/sitemap', (req, res) => {

})

Router.use('/', express.static('public'))
Router.use('/assets', express.static('dist/assets'))

Router.use('/secret', routerAdmin)

Router.get('/', async (req, res) => {
    const presence = await discordService.getSkybirdPresence()
    const postList = await postManager.getPosts()
    res.render('index', {
        presence,
        postList
    })
})

Router.get('/portfolio', async (req, res) => {
    const presence = await discordService.getSkybirdPresence()
    res.render('portfolio', {
        presence,
        getVueAssetsHTML
    })
})

Router.get('/test', (req, res) => {
    res.render('test')
})

Router.get('/*', (req, res) => {
    res.render('notFound')
})

module.exports = Router