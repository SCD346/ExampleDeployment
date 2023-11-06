const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')
const seedData = require('../seeds.js')

//ROUTE: INDEX -> Create a new BREAD
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean()
  const foundBreads = await Bread.find().limit(25).lean()
  console.log(foundBreads)
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page',
  })
})
// //ROUTE: INDEX -> Create a new bread
// breads.get('/', (req, res) => {
//   Baker.find().then((foundBakers) => {
//     Bread.find().then((foundBreads) => {
//       res.render('index', {
//         breads: foundBreads,
//         bakers: foundBakers,
//         title: 'Index Page',
//       })
//     })
//   })
// })

// ROUTE: GET -> Get the create new form
breads.get('/new', (req, res) => {
  Baker.find().then((foundBakers) => {
    res.render('new', {
      bakers: foundBakers,
    })
  })
})

// ROUTE: (SHOW) GET -> Get a bread by id
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    .populate('baker')
    .then((foundBread) => {
      res.render('show', {
        bread: foundBread,
      })
    })
    .catch((err) => {
      res.send('404')
    })
})

// ROUTE: (EDIT) GET -> Gets the edit form, populates it by id
// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find().then((foundBakers) => {
    Bread.findById(req.params.id).then((foundBread) => {
      res.render('edit', {
        bread: foundBread,
        bakers: foundBakers,
      })
    })
  })
})

// ROUTE: PUT -> Updates the
breads.put('/:id', (req, res) => {
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(
    (updatedBread) => {
      console.log(updatedBread)
      res.redirect(`/breads/${req.params.id}`)
    }
  )
})

// ROUTE: DELETE -> Deletes the a bread by id
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id).then((deletedBread) => {
    res.status(303).redirect('/breads')
  })
})

// ROUTE: POST -> Creata a new bread
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }

  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }

  Bread.create(req.body).then(() => {
    res.redirect('/breads')
  })
  // .catch(error => {
  //     res.render('New', {
  //       error
  //     })
  // })
})
// ROUTE: SEED DATA -> Seeds bread data
breads.get('/data/seed', (req, res) => {
  Bread.insertMany(seedData).then(() => {
    res.redirect('/breads')
  })
})

module.exports = breads
