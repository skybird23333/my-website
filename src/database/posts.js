const { db, client } = require('./index')
const util = require('util');
const { Collection } = require('discord.js');
const logger = require('../logger/logger');
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

md.use(require('markdown-it-container'), 'info', {});
md.use(require('markdown-it-container'), 'warn', {});
md.use(require('markdown-it-container'), 'error', {});
md.use(require('markdown-it-named-headings'));
md.set({ breaks: true });


class PostManager {
    constructor() {
        //TODO: listen for post changes in db
        this.collection = db.collection('posts')
        this.postCache = new Collection()
    }

    async postWatchStreamChange(newPost) {
        const documentKey = newPost.documentKey
        if (newPost.updateDescription.updatedFields.content) {
            await this.collection.findOneAndUpdate(documentKey, {
                $set: { renderedContent: md.render(newPost.fullDocument.content.replace(/\\n/g, '\n')) }
            })
            this.postCache.set(
                newPost.fullDocument.id,
                Object.assign(newPost.fullDocument, { renderedContent: md.render(newPost.fullDocument.content.replace(/\\n/g, '\n')) })
            )
        }
        logger.debug('PostManager/Post updated: ' + newPost.fullDocument.id)
    }
    
    /**
     * Get a specfiic post by ID
     * @param {string} id | The text id of the post
     * @returns {object} | The post object
     */
    async getPost(id) {
        logger.debug('PostManager/Post get: ' + id)
        if (this.postCache.get(id)) {
            const post = this.postCache.get(id)
            
            if (!post.renderedContent) {
                const renderedContent = md.render(post.content.replace(/\\n/g, '\n'))
                this.collection.findOneAndUpdate({ id: id }, { $set: { renderedContent: renderedContent } })
                post.renderedContent = renderedContent
            }
            
            return post
        } else {
            const post = await this.collection.findOne({ id: id })
            this.postCache.set(id, post)
            return post
        }
    }

    async clearPostRenderedContent() {
        logger.debug('PostManager/Clear post rendered content')
        return this.collection.updateMany({}, { $unset: { renderedContent: '' } })
    }
    
    /**
     * Get all posts
     * @returns {object[]} | An array of post objects
     */
    async getPosts() {
        logger.debug('PostManager/Get posts')
        return this.postCache.map(post => post)
    }
    
    /**
     * 
     * @param {object} post | The post object
     */
    async createPost(post) {
        logger.debug('PostManager/Create post')
        this.postCache.set(post.id, post)
        return this.collection.insertOne(post)
    }
    
    /**
     * 
     * @param {id} id 
     * @param {*} post 
     * @returns 
     */
    async updatePost(id, post) {
        logger.debug('PostManager/Update post')
        this.postCache.set(id, post)
        return this.collection.updateOne({ id: id }, { $set: { post: post, renderedContent: md.render(post.content.replace(/\\n/g, '\n')) } })
    }
    
    
    async deletePost(id) {
        logger.debug('PostManager/Delete post')
        this.postCache.delete(id)
        return this.collection.deleteOne({ id: id })
    }
}

module.exports = new PostManager()