const path = require('path')
const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 8080
const app = express()
module.exports = app

/**
 * In development environment, I keep all of the
 * app's secret API keys in a file called `secrets.js`, in the project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. 
 */
if (process.env.NODE_ENV !== 'production') require('../secrets')

const createApp = () => {
  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))
  
  app.use('/api', require('./api'))

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {

  app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
  )
}

createApp()
startListening()

