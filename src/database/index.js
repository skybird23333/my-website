const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

module.exports.client = client

module.exports.db = client.db('my-website')

const posts = require("./posts");

module.exports.initClient = async () => {
    client.connect(function (err) {
        if (err) throw err;
    })

    client.once('connectionReady', async () => {
        const postsCollection = client.db("my-website").collection("posts")
        postsCollection.watch([], { fullDocument: "updateLookup" }).on('change', (change) => {
            posts.postWatchStreamChange(change)
        })
        const postsList = await postsCollection.find().toArray()
        
        postsList.map(post => {
            posts.postCache.set(post.id, post)
        })
    })

    return client
}

