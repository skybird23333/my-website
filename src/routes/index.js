const express = require('express')
const Router = new express.Router()
const showdown = require('showdown')
const converter = new showdown.Converter()

const discordService = require('../discord/index')
const databaseService = require('../database/index')

const post = require('./testpost')

Router.get('/test', (req, res) => {
    post.content = converter.makeHtml(post.content)
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

Router.use('/', express.static('public'))

Router.get('/', async (req, res) => {
    const presence = await discordService.getSkybirdPresence()
    res.render('index', {
        presence
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