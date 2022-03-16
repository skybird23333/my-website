const { db } = require('./index')

/**
 * Get a specfiic post by ID
 * @param {string} id | The text id of the post
 * @returns {object} | The post object
 */
module.exports.getPost = async (id) => {
    return db.collection('posts').findOne({ id: id })
}
/**
 * Get all posts
 * @returns {object[]} | An array of post objects
 */
module.exports.getPosts = async () => {
    return db.collection('posts').find().toArray()
}
/**
 * 
 * @param {object} post | The post object
 */
module.exports.createPost = async (post) => {
    return db.collection('posts').insertOne(post)
}
/**
 * 
 * @param {id} id 
 * @param {*} post 
 * @returns 
 */
module.exports.updatePost = async (id, post) => {
    return db.collection('posts').updateOne({ id: id }, { $set: post })
}
module.exports.deletePost = async (id) => {
    return db.collection('posts').deleteOne({ id: id })
}