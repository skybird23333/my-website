const { db, client } = require('./index')
const util = require('util');
const { Collection } = require('discord.js');
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

md.use(require('markdown-it-container'), 'info', {});
md.use(require('markdown-it-container'), 'warn', {});
md.use(require('markdown-it-container'), 'error', {});
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
        console.log('Post updated: ' + newPost.fullDocument.id)
    }

    /**
     * Get a specfiic post by ID
     * @param {string} id | The text id of the post
     * @returns {object} | The post object
     */
    async getPost(id) {
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

    /**
     * Get all posts
     * @returns {object[]} | An array of post objects
     */
    async getPosts() {
        return this.postCache.map(post => post)
    }

    /**
     * 
     * @param {object} post | The post object
     */
    async createPost(post) {
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
        this.postCache.set(id, post)
        return this.collection.updateOne({ id: id }, { $set: { post: post, renderedContent: md.render(post.content.replace(/\\n/g, '\n')) } })
    }


    async deletePost(id) {
        this.postCache.delete(id)
        return this.collection.deleteOne({ id: id })
    }
}

module.exports = new PostManager()