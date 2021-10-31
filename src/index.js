const express = require('express')
const app = express()
var port = 2333

if(process.argv[2]) {
    port = 6969 //dev mode
}

else {
    app.use('/', express.static("../dist")); //not dev mode
}


app.get('/api*', (req, res) => {
    res.send('hi')
})

// GLOBAL ENDPOINTS
app.get('/api/v') //version

app.get('/api/f/:file') //get file info
app.get('/api/f/:file/download') //download file(latest version)

app.get('/api/f/:file/stats') //get file global stat

app.get('/api/f/:file/v/:version/') //get info of a version
app.get('/api/f/:file/v/:version/download') //download version
app.get('/api/f/:file/v/:version/stats') //get file global stat

// ADMIN ENDPOINTS


app.post('/api/f/:file') //

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})