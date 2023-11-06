// dependencies
const express = require('express')
const baker = express.Router()
const bakerSeedData = require('../models/baker_seed.js')
const Baker = require('../models/baker.js')

// ROUTE: BAKER SEED DATA ROUTE
baker.get('/data/seed', (req, res) => {
  Baker.insertMany(bakerSeedData).then(res.redirect('/breads'))
})

// ROUTE: INDEX call .find() on the Baker model.
baker.get('/', (req, res) => {
  Baker.find()
    .populate('breads')
    .then((foundBakers) => {
      res.send(foundBakers)
    })
})

// ROUTE: SHOW
baker.get('/:id', (req, res) => {
  Baker.findById(req.params.id)
    .populate({
      path: 'breads',
      options: { limit: 5 },
    })
    .then((foundBaker) => {
      res.render('bakerShow', {
        baker: foundBaker,
      })
    })
})
// // ROUTE: SHOW
// baker.get('/:id', (req, res) => {
//   Baker.findById(req.params.id)
//     .populate('breads')
//     .then((foundBaker) => {
//       res.render('bakerShow', {
//         baker: foundBaker,
//       })
//     })
// })

//ROUTE: DELETE a baker
baker.delete('/:id', (req, res) => {
  Baker.findByIdAndDelete(req.params.id).then((deletedBaker) => {
    res.status(303).redirect('/breads')
  })
})

// export
module.exports = baker
