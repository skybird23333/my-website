/**
 * Strips empty fields from an object.
 * 
 * @param {object} data The object to strip from
 */
module.exports = function stripEmptyFields(data) {
    return Object.keys(data).reduce((acc, key) => {
        if (data[key]) {
            acc[key] = data[key]
        }
        return acc
    } , {})
} 