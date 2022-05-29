
(async () => {
  const morgan = require('morgan');
  const express = require('express')
  require('dotenv').config()
  
  const discordService = require('./discord/index')
  const databaseService = require('./database/index')
  
  process.on('uncaughtException', (err) => { console.error(err) })
  process.on('unhandledRejection', (err) => { console.error(err) })
  
  const app = express()
  const logger = require('./logger/logger')
  
  module.exports = {
    logger,
    app
  }
  
  app.set('view engine', 'ejs');
  app.use(express.json())
  app.use(morgan(function (tokens, req, res) {
    if(/(img)|(css)|(favicon)/.test(req.path)) return
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }))
  
  await discordService.initClient().then(client => {
    logger.info(`DISCORD: Logged in as ${client.user.tag}`);
  })
  
  await databaseService.initClient().then(() => {
    logger.info(`MONGODB: Logged into database`);
  })

  const apiRouter = require('./api/index')
  const Router = require('./routes/index')
  
  app.use('/api', apiRouter)
  logger.info('API Endpoints registered')
  app.use('/', Router)
  logger.info('Routes registered')

  app.listen(process.env.PORT || 2333, () => {
    logger.done(`App is running at http://localhost:${process.env.PORT || 2333}`)
  })
})();