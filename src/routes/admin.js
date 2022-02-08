const { Router } = require("express");

const routerAdmin = new Router()

routerAdmin.get('/index', (req, res) => {
    res.render('secret/admin')
})

module.exports = routerAdmin