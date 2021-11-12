const express = require('express')
const apiRouter = require('./api/index')
const { default: Log75, LogLevel } = require('log75')
const logger = new Log75(LogLevel.Standard, {color: true, bold: true})

const app = express()

app.set('view engine', 'ejs');
app.use(express.json())


app.use('/api', apiRouter)
logger.info('API Endpoints registered')

app.get('/test', (req, res) => {
  res.render('basePage')
})


app.get('/*', (req, res) => {
  res.render('index')
})

app.use(function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}
)

app.listen(2333 || process.env.PORT, () => {
  logger.done(`App is running at http://localhost:${2333 || process.env.PORT}`)
})

module.exports = {
  logger,
  app
}