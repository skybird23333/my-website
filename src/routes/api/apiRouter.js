const express = require('express')
const Router = new express.Router()

Router.use('/secret', require('./admin'))

Router.get('*', (req, res) => {
    res.status(404).send({'error': 'Not found'})
})

module.exports = Router