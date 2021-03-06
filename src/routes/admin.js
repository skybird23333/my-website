const { Router, json } = require("express");
const { postLoginAttemptMessage } = require("../discord");
const crypto = require('crypto');
const { generateSess, validateSess, logoutSess } = require("../database/auth");
const cookieParser = require("cookie-parser");
const posts = require("../database/posts");

const routerAdmin = new Router()

routerAdmin.use(cookieParser())
routerAdmin.use(json())

routerAdmin.use(async function(req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    //if path isnt login, test for session
    if (!await validateSess(req.cookies.sessionId, ip) && req.path !== '/login') {
        return res.redirect('/secret/login')
    }
    if(await validateSess(req.cookies.sessionId, ip) && req.path === '/login') {
        return res.redirect('/secret/index')
    }
    next()
})

routerAdmin.get('/index', (req, res) => {
    res.render('secret/admin')
})

routerAdmin.get('/developer', (req, res) => {
    res.render('secret/developer')
})

routerAdmin.get('/login', (req, res) => {
    res.render('secret/login')
})

routerAdmin.post('/login', (req, res) => {
    if (!process.env.AUTH_PASSWORD_HASH) {
        return res.status(401).send('Unauthorized')
    }

    const { email, password } = req.body
    if(!email || !password) return res.status(400).send('Unauthorized')

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    let success = false

    if (crypto.createHash('sha256').update(password).digest("hex") === process.env.AUTH_PASSWORD_HASH) {
        success = true
        generateSess(ip).then(sess => {
            res.cookie('sessionId', sess.sessionId)
            res.status(200).send('OK')
        })
    } else {
        res.status(401).send('Unauthorized')
    }

    postLoginAttemptMessage(email, ip, success)
})

routerAdmin.get('/actions/clear-render-cache', async (req, res) => {
    await posts.clearPostRenderedContent()
    res.render('secret/actions/clear-render-cache')
})

routerAdmin.get('/actions/logout', async (req, res) => {
    await logoutSess(req.cookies.sessionId)
    res.clearCookie('sessionId')
    res.redirect('/secret/login')
})

module.exports = routerAdmin
