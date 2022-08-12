const { Router, json } = require("express");
const cookieParser = require("cookie-parser");
const crypto = require('crypto')
const { postLoginAttemptMessage } = require('../../discord/index');
const postManager = require("../../database/posts");
const { generateSess, validateSess } = require("../../database/auth");

const routerAdminApi = new Router()

routerAdminApi.use(cookieParser())
routerAdminApi.use(json())


routerAdminApi.post('/login', (req, res) => {
    if (!process.env.AUTH_PASSWORD_HASH) {
        return res.status(401).send({error: 'Unauthorized'})
    }
    
    const { email, password } = req.body
    if (!email || !password) return res.status(400).send({error: 'Unauthorized'})
    
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    
    let success = false

    if (crypto.createHash('sha256').update(password).digest("hex") === process.env.AUTH_PASSWORD_HASH) {
        success = true
        generateSess(ip).then(sess => {
            res.cookie('sessionId', sess.sessionId)
            res.status(200).send('OK')
        })
    } else {
        res.status(401).send({error: 'Unauthorized'})
    }
    
    postLoginAttemptMessage(email, ip, success)
})

routerAdminApi.use(async function (req, res, next) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    //if path isnt login, test for session
    if (!await validateSess(req.cookies.sessionId, ip)) {
        return res.status(401).send({
            error: 'Unauthorized'
        })
    }
    next()
})

routerAdminApi.patch('/update-post/:id', async (req, res) => {
    const { id } = req.params

    await postManager.updatePost(id, {
        title: req.body.title || null,
        subtitle: req.body.subtitle || null,
        content: req.body.content || null,
        author: req.body.author || null
    })
    res.status(200).send({ message: 'Post is updated.'})
})

module.exports = routerAdminApi