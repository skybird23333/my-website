const { default: Log75, LogLevel } = require('log75')
const logger = new Log75(LogLevel.Standard, { color: true, inverted: true })

module.exports = logger