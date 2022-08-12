const { Router, json } = require("express");
const { postLoginAttemptMessage } = require("../discord");
const crypto = require('crypto');
const { generateSess, validateSess, logoutSess } = require("../database/auth");
const cookieParser = require("cookie-parser");
const postManager = require("../database/posts");

const routerAdmin = new Router()

routerAdmin.use(cookieParser())
routerAdmin.use(json())

routerAdmin.use(async function (req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    //if path isnt login, test for session
    if (!await validateSess(req.cookies.sessionId, ip) && req.path !== '/login') {
        return res.redirect('/secret/login')
    }
    if (await validateSess(req.cookies.sessionId, ip) && req.path === '/login') {
        return res.redirect('/secret/index')
    }
    next()
})

routerAdmin.get('/', async function (req, res) {
    res.redirect('/secret/index')
})

routerAdmin.get('/index', (req, res) => {
    res.render('secret/admin')
})

routerAdmin.get('/developer', (req, res) => {
    res.render('secret/developer')
})

routerAdmin.get('/posts', async (req, res) => {
    const postList = await postManager.getPosts()
    res.render('secret/manage-posts', { postList })
})

routerAdmin.get('/login', (req, res) => {
    res.render('secret/login')
})

routerAdmin.get('/actions/clear-render-cache', async (req, res) => {
    await postManager.clearPostRenderedContent()
    res.render('secret/actions/clear-render-cache')
})

routerAdmin.get('/actions/logout', async (req, res) => {
    await logoutSess(req.cookies.sessionId)
    res.clearCookie('sessionId')
    res.redirect('/secret/login')
})

routerAdmin.get('/update-post/:id', async (req, res) => {
    
    let post = await postManager.getPost(req.params.id);

    if(!post) {
        return res.render('notFound')
    }
    
    res.render('secret/update-post', { post })

})

module.exports = routerAdmin
