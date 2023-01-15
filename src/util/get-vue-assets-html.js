/**
 * Returns HTML code containing vue components depending on environment
 * TODO:
 * @returns HTML code containing vue components
 */
module.exports = function getVueAssetsHTML() {
    return `
        <script type="module" src="http://localhost:5173/@vite/client"></script>
        <script type="module" onload="mountVueApp()" src="http://localhost:5173/app/main.js"></script>
    `
}