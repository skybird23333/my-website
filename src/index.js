
(async () => {
  const morgan = require('morgan');
  const express = require('express')
  const Sentry = require('@sentry/node')
  const Tracing = require('@sentry/tracing')
  require('dotenv').config()
  
  const discordService = require('./discord/index')
  const databaseService = require('./database/index')
  
  process.on('uncaughtException', (err) => { console.error(err) })
  process.on('unhandledRejection', (err) => { console.error(err) })
  
  const app = express()
  const logger = require('./logger/logger')
  
  Sentry.init({
    dsn: process.env.SENTRY_URL,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());

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
  
  app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
  
  app.use('/api', apiRouter)
  logger.info('API Endpoints registered')
  app.use('/', Router)
  logger.info('Routes registered')

  app.use(Sentry.Handlers.errorHandler());

  app.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    if(req.headers.accepts === 'text/html') {
      res.render('error', { error: err });
    } else {
      res.json({ error: 'Internal Server Error' });
    }
  })


  app.listen(process.env.PORT || 2333, () => {
    logger.done(`App is running at http://localhost:${process.env.PORT || 2333}`)
  })
})();