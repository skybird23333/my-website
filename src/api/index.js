const express = require('express')
const Router = new express.Router()

Router.get('*', (req, res) => {
    res.send('hi')
})

module.exports = Router