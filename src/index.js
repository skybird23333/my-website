const express = require('express')
const apiRouter = require('./api/index')
const { default: Log75, LogLevel } = require('log75')
const showdown = require('showdown')
require('dotenv').config()
require('./discord/index')
var { getSkybirdPresence, postFeedbackMessage } = require('./discord/index')

process.on('uncaughtException', (err) => {console.error(err)})
process.on('unhandledRejection', (err) => {console.error(err)})

const app = express()
const logger = new Log75(LogLevel.Standard, {color: true, bold: true})
const converter = new showdown.Converter()

module.exports = {
  logger,
  app
}

app.set('view engine', 'ejs');
app.use(express.json())


app.use('/api', apiRouter)
logger.info('API Endpoints registered')

const post = require('./testpost')

app.get('/test', (req, res) => {
  post.content = converter.makeHtml(post.content)
  res.render('post', {post})
})

app.get('/search', (req, res) => {
  res.render('search', {
    query: decodeURI(req.query.query)
  })
})

app.get('/feedback', (req, res) => {
  if(req.query.message && req.query.message.length > 0 && req.query.email && req.query.email.length > 0) {
    postFeedbackMessage(req.query.message, req.query.email)
    res.render('feedback', {
      feedback: {
        message: "amogus"
      }
    })
  } else {
    res.render('feedback', {feedback: null})
  }
})

app.use('/', express.static('public'))

app.get('/', async (req, res) => {
  const presence = await getSkybirdPresence()
  res.render('index', {
    presence
  })
})

app.get('/*', (req, res) => {
  res.render('notFound')
})

app.use(function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
})

app.listen(2333 || process.env.PORT, () => { //TODO make app somehow start only after other services ready
  logger.done(`App is running at http://localhost:${2333 || process.env.PORT}`)

})
