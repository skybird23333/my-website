const express = require('express')
const Router = new express.Router()
var MarkdownIt = require('markdown-it'),
md = new MarkdownIt();

md.use(require('markdown-it-container'), 'info', {});
md.use(require('markdown-it-container'), 'warn', {});
md.use(require('markdown-it-container'), 'error', {});
md.set({breaks: true});

const discordService = require('../discord/index')
const databaseService = require('../database/index')

const routerAdmin = require('./admin');
const { getPost, getPosts } = require('../database/posts');

Router.get('/posts/:id', async (req, res) => { //TODO: Starter kit post content not rendered
    let post = await getPost(req.params.id);
    if(!post) {
        return res.render('notFound')
    } 
    post.renderedContent = md.render(post.content.replace(/\\n/g, '\n'));
    console.log(post)
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
    const posts = await getPosts()
    res.render('index', {
        presence,
        posts
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