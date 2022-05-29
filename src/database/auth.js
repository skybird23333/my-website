const { db } = require('./index')
const crypto = require('crypto')

// const session = {
//     sessionId: 'eQngpeQGPmogqepoqerpkqegoQEPOGmnQEPG_',
//     createdAt: 1359013587193085901385,
//     ip: '192.168.0.1',
// }

/**
 *  
 * @param {string} ip
 */
module.exports.generateSess = async (ip) => {
    const createdAt = Date.now()
    const sessionId = crypto.randomBytes(16).toString('hex')
    db.collection('auth').insertOne({ sessionId, createdAt, ip })
    return {
        sessionId,
        createdAt,
        ip
    }
}

/**
 * 
 * @param {string} sessionId 
 */
module.exports.validateSess = async (sessionId) => {
    //sessions need to:
    //- exist in database
    //- createdAt is within 12 hours
    const session = await db.collection('auth').findOne({ sessionId })

    if(!session) return false

    return session.createdAt > Date.now() - (12 * 60 * 60 * 1000);
}