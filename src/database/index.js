const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

module.exports = {
    async initClient() {
        return client.connect(function(err) {
            if (err) throw err;
        });
    },
    db: client.db('my-website')
}