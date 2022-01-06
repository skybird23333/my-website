(async () => {
  const express = require('express')
  const showdown = require('showdown')
  require('dotenv').config()
  
  const discordService = require('./discord/index')
  const databaseService = require('./database/index')
  
  process.on('uncaughtException', (err) => { console.error(err) })
  process.on('unhandledRejection', (err) => { console.error(err) })
  
  const app = express()
  const logger = require('./logger/logger')
  const converter = new showdown.Converter()
  
  module.exports = {
    logger,
    app
  }
  
  app.set('view engine', 'ejs');
  app.use(express.json())
  
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