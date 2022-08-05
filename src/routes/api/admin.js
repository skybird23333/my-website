const { Router, json } = require("express");
const cookieParser = require("cookie-parser");
const crypto = require('crypto')
const { postLoginAttemptMessage } = require('../../discord/index')

const routerAdminApi = new Router()

routerAdminApi.use(cookieParser())
routerAdminApi.use(json())

routerAdminApi.post('/login', (req, res) => {
    if (!process.env.AUTH_PASSWORD_HASH) {
        return res.status(401).send('Unauthorized')
    }

    const { email, password } = req.body
    if (!email || !password) return res.status(400).send('Unauthorized')

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

routerAdminApi.post('/update-post/:id', async (req, res) => {
    const { id } = req.params
    const { title, subtitle, content, author } = req.body
    await postManager.updatePost(id, {
        title,
        subtitle,
        content,
        author
    })
    res.status(200).send({ message: 'Post is updated.'})
})

module.exports = routerAdminApi