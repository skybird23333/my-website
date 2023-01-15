const manifest = require('../../dist/manifest.json')

/**
 * Returns HTML code containing vue components depending on environment
 * @returns HTML code containing vue components
 */
module.exports = function getVueAssetsHTML() {
    if(process.env.NODE_ENV === 'development') {
        return `
            <script type="module" src="http://localhost:5173/@vite/client"></script>
            <script type="module" onload="mountVueApp()" src="http://localhost:5173/app/main.js"></script>
        `
    } else {
        return Object.keys(manifest).map(filename =>
            filename.endsWith('css') ?
            `<link rel="stylesheet" href="/${manifest[filename].file}" />` :
            `<script type="module" onload="mountVueApp()" src="/${manifest[filename].file}"></script>`
        )
    }
}