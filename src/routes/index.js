const express = require('express')
const Router = new express.Router()

const discordService = require('../discord/index')
const databaseService = require('../database/index')

const routerAdmin = require('./admin');
const posts = require('../database/posts');

Router.get('/posts/:id', async (req, res) => {
    let post = await posts.getPost(req.params.id);
    if(!post) {
        return res.render('notFound')
    }
    res.render('post', { post })
})

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

Router.get('/release-test', (req, res) => {
    res.render('release')
})

Router.get('/sitemap', (req, res) => {

})

Router.use('/', express.static('public'))

Router.use('/secret', routerAdmin)

Router.get('/', async (req, res) => {
    const presence = await discordService.getSkybirdPresence()
    const postList = await posts.getPosts()
    res.render('index', {
        presence,
        postList
    })
})

Router.get('/*', (req, res) => {
    res.render('notFound')
})

Router.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
})

module.exports = Router