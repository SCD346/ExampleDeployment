// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT //<--------------------------------------------------------------------------------------------
const app = express()

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public')) //static assets
app.use(express.urlencoded({ extended: true })) //change a string into an object so we can work with it
app.use(methodOverride('_method')) //DAY 5: New tool.  Help us handle the DELETE using a POST

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads')
})

// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// bakers
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// 404 Page
app.get('*', (req, res) => {
  res
    .status(404)
    .send(
      'This is just a 404 error message. For more information, you can visit <a href="https://en.wikipedia.org/wiki/HTTP_404">HTTP 404 on Wikipedia</a>'
    ) //<--- Just put a simple message on the page for now
})

//MONGOOSE (Object Data Mapper for Mongo)
// mongoose.connect(
//   process.env.MONGO_URI,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   () => {
//     console.log('connected to mongo: ', process.env.MONGO_URI)
//   }
// )
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// LISTEN
app.listen(PORT, () => {
  console.log('listening on port', PORT)
})
