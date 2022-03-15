const { db } = require('./index')

/**
 * Get a specfiic post by ID
 * @param {string} id | The text id of the post
 * @returns {object} | The post object
 */
module.exports.getPost = (id) => {
    return db.collection('posts').findOne({ _id: id })
}
/**
 * Get all posts
 * @returns {object[]} | An array of post objects
 */
module.exports.getPosts = () => {
    return db.collection('posts').find().toArray()
}
/**
 * 
 * @param {object} post | The post object
 */
module.exports.createPost = (post) => {
    return db.collection('posts').insertOne(post)
}
/**
 * 
 * @param {id} id 
 * @param {*} post 
 * @returns 
 */
module.exports.updatePost = (id, post) => {
    return db.collection('posts').updateOne({ _id: id }, { $set: post })
}
module.exports.deletePost = (id) => {
    return db.collection('posts').deleteOne({ _id: id })
}