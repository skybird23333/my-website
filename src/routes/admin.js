const { Router, json } = require("express");
const { postLoginAttemptMessage } = require("../discord");
const crypto = require('crypto');
const { generateSess, validateSess } = require("../database/auth");
const cookieParser = require("cookie-parser");

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

module.exports = routerAdmin
