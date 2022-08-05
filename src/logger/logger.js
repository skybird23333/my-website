const { default: Log75, LogLevel } = require('log75')
const logger = new Log75(LogLevel.Debug, { color: true, inverted: true })

module.exports = logger