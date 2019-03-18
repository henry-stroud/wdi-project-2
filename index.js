require('dotenv').config()
const express = require('express')
const port = process.env.PORT || 8080
const app = express()
const path = require('path')

app.use(express.static(`${__dirname}/dist`))

// __dirname gets the current folder we are in, and gets the dist folder ready to be served up as a file

app.get('/*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))

// this says that any request that comes into any url, we will respond with our index html folder that contains the script tag to go to the bundle.js

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'src/build')))
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'src/build', 'index.html'))
  })
}

app.listen(port, () => console.log(`App is listening on port ${port}`))
