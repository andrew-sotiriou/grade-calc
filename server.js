var express = require('express')
var app = express()

app.use(express.static('html'))

app.listen(8000, function() {
    console.log("Server listening on port 8000");
    console.log("Open a web browser and go to http://localhost:8000")
})