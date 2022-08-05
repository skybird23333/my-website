/* Generate an array of contents from a markdown file. */
/**
 * 
 * @param {string} content Markdown content
 * @returns {object[]} An array of contents object, please see the function itself
 */
module.exports = function generatePostContent(content) {

    const match = content.match(/\n(?=# ).+/g)

    return match ? match //match ONLY the big headings
        .map(text => {
            return text.slice(3) //remove \n, # and space
        })
        .map(text => {
            return {
                text: text,
                id: text.replace(/\s/g, '-') //replace spaces with dashes
                    .replace(/([^a-zA-Z-])/g, '') //remove non-alphanumeric characters
                    .toLowerCase() //make lowercase
            }
        })
        : []
} 