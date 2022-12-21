const { db, client } = require('./index')
const util = require('util');
const { Collection } = require('discord.js');
const logger = require('../logger/logger');
const stripEmptyFields = require('../util/strip-empty-fields');
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

md.use(require('markdown-it-container'), 'info', {});
md.use(require('markdown-it-container'), 'warn', {});
md.use(require('markdown-it-container'), 'error', {});
md.use(require('markdown-it-named-headings'));
md.set({ breaks: true });

/**
 * A post object.
 * @typedef {Object} Post
 * @property {string} id - The id of the post.
 * @property {string} title - The title of the post.
 * @property {string} subtitle - The subtitle of the post.
 * @property {string} content - The markdown content of the post.
 * @property {string} [renderedContent] - The rendered HTML content of the post.
 * @property {string} author - The author of the post.
 * @property {number} published - The unix timestamp at which the post was published.
 * @property {boolean} [draft] - Whether the post is a draft(not visible to the public).
 * @property {string[]} tags - The tags of the post.
 */

class PostManager {
    constructor() {
        this.collection = db.collection('posts')
        this.postCache = new Collection()
    }

    /**
     * 
     * @param {import('mongodb').ChangeStreamDocument} newPost 
     */
    async postWatchStreamChange(newPost) {
        const documentKey = newPost.documentKey
        if(!(newPost.operationType === "insert")) return
        if(!newPost.updateDescription) return
        if(!newPost.fullDocument) return
        if (newPost.updateDescription.updatedFields.content) {
            await this.collection.findOneAndUpdate(documentKey, {
                $set: { renderedContent: md.render(newPost.fullDocument.content.replace(/\\n/g, '\n')) }
            })
            this.postCache.set(
                newPost.fullDocument.id,
                Object.assign(newPost.fullDocument, { renderedContent: md.render(newPost.fullDocument.content.replace(/\\n/g, '\n')) })
            )
        }
        logger.debug('PostManager/Post re-rendered: ' + newPost.fullDocument.id)
    }
    
    /**
     * Get a specfiic post by ID
     * @param {string} id | The text id of the post
     * @returns {Post} | The post object
     */
    async getPost(id) {
        logger.debug('PostManager/Post get: ' + id)
        if (this.postCache.get(id)) { //Attempt to find post in cache
            const post = this.postCache.get(id)
            
            if (!post.renderedContent) { //If not rendered, render it and store it in db
                const renderedContent = md.render(post.content.replace(/\\n/g, '\n'))
                this.collection.findOneAndUpdate({ id: id }, { $set: { renderedContent: renderedContent } })
                post.renderedContent = renderedContent
            }
            
            return post
        } else { //Attempt to find post in database
            const post = await this.collection.findOne({ id: id })
            if(!post) return null
            this.postCache.set(id, post)
            return post
        }
    }

    async clearPostRenderedContent() {
        logger.debug('PostManager/Clear post rendered content')
        this.postCache = new Collection()
        await this.collection.updateMany({}, { $unset: { renderedContent: '' } })
        const postsList = await this.collection.find().toArray()
        
        postsList.map(post => {
            this.postCache.set(post.id, post)
        })
        return
    }

    /**
     * @typedef {Object} PostSearchOptions
     * @property {boolean} [includeDraft] - Whether to include draft posts in the search.
     * @property {string} [tag] - The tag to search for
     */
    
    /**
     * Get all posts
     * @returns {Promise<Post[]>} | An array of post objects
     * @param {PostSearchOptions} options | The options for the search
     */
    async getPosts(options = {}) {
        logger.debug('PostManager/Get posts')
        return this.postCache.filter(post => {
            if(!options.includeDraft) {
                if(post.draft) {
                    return false
                }
            }

            if(options.tag) {
                if(!post.tags?.includes(options.tag)) return false
            }

            return post
        }).map(a => a)
    }
    
    /**
     * 
     * @param {Post} post | The post object
     */
    async createPost(post) {
        logger.debug('PostManager/Create post')
        this.postCache.set(post.id, post)
        return this.collection.insertOne(post)
    }
    
    /**
     * 
     * @param {id} id 
     * @param {Partial<Post>} post 
     * @returns 
     */
    async updatePost(id, post) {
        logger.debug('PostManager/Update post')
        
        const document = await this.collection.findOne({ id: id })
        
        post = stripEmptyFields(post)
        
        post.renderedContent = md.render(post.content.replace(/\\n/g, '\n'))
        
        this.postCache.set(id, document)
        Object.assign(document, post)

        return this.collection.replaceOne({ id: id }, document)
    }
    
    
    async deletePost(id) {
        logger.debug('PostManager/Delete post')
        this.postCache.delete(id)
        return this.collection.deleteOne({ id: id })
    }
}

module.exports = new PostManager()
