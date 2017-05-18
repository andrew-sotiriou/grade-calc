const express = require('express')
const app = express()
const config = require('./config')

app.use(express.static('html'))

app.listen(config.port, () => {
    console.log('Server listening on port '+ config.port);
    console.log("Open a web browser and go to http://localhost:"+ config.port)
})