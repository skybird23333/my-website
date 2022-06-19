
(async () => {
  const morgan = require('morgan');
  const express = require('express')
  const Sentry = require('@sentry/node')
  const Tracing = require('@sentry/tracing')
  require('dotenv').config()
  
  const discordService = require('./discord/index')
  const databaseService = require('./database/index')
  
  const app = express()
  const logger = require('./logger/logger')
  
  Sentry.init({
    dsn: process.env.SENTRY_URL,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

  
  module.exports = {
    logger,
    app
  }

  process.on('uncaughtException', (e) => { Sentry.captureException(e); })
  process.on('unhandledRejection', (e) => { Sentry.captureException(e); })
  
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
  
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());

  const apiRouter = require('./api/index')
  const Router = require('./routes/index')

  
  app.use('/api', apiRouter)
  logger.info('API Endpoints registered')
  app.use('/', Router)
  logger.info('Routes registered')

  app.use(Sentry.Handlers.errorHandler());

  app.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    logger.error(`Sentry ID: ${res.sentry}`)
    res.status(500);
    if(req.headers.accept.includes('text/html')) {
      res.render('error', { error: err, id: res.sentry });
    } else {
      res.json({ error: 'Internal Server Error' });
    }
  })


  app.listen(process.env.PORT || 2333, () => {
    logger.done(`App is running at http://localhost:${process.env.PORT || 2333}`)
  })
})();