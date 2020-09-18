// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for family-members
const FamilyMember = require('../models/family_api')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { familyMember: { title: '', text: 'foo' } } -> { familyMember: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /family-members
router.get('/family-members', requireToken, (req, res, next) => {
  FamilyMember.find()
    .then(familyMembers => {
      // `family-members` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return familyMembers.map(singleMember => singleMember.toObject())
    })
    // respond with status 200 and JSON of the family-members
    .then(familyMembers => res.status(200).json({ familyMembers: familyMembers }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /family-members/5a7db6c74d55bc51bdf39793
router.get('/family-members/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  FamilyMember.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "familyMember" JSON
    .then(familyMember => res.status(200).json({ familyMember: familyMember.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /family-members
router.post('/family-members', requireToken, (req, res, next) => {
  console.log('add a family member')
  console.log('req.body is', req.body)
  console.log('req.body is', req.body.familyMember)

  req.body.familyMember.owner = req.user.id
  const familyData = req.body.familyMember

  FamilyMember.create(familyData)
  // respond to succesful `create` with status 201 and JSON of new "familyMember"
    .then(familyMember => {
      res.status(201).json({ familyMember: familyMember.toObject() })
    })
    .catch(next)
})
// router.post('/family-members', requireToken, (req, res, next) => {
//   // set owner of new familyMember to be current user
//   req.body.familyMember.owner = req.user.id
//
//   FamilyMember.create(req.body.familyMember)
//     // respond to succesful `create` with status 201 and JSON of new "familyMember"
//     .then(familyMember => {
//       res.status(201).json({ familyMember: familyMember.toObject() })
//     })
//     // if an error occurs, pass it off to our error handler
//     // the error handler needs the error message and the `res` object so that it
//     // can send an error message back to the client
//     .catch(next)
// })

// UPDATE
// PATCH /family-members/5a7db6c74d55bc51bdf39793
router.patch('/family-members/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.familyMember.owner

  FamilyMember.findById(req.params.id)
    .then(handle404)
    .then(familyMember => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, familyMember)

      // pass the result of Mongoose's `.update` to the next `.then`
      return familyMember.updateOne(req.body.familyMember)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /family-members/5a7db6c74d55bc51bdf39793
router.delete('/family-members/:id', requireToken, (req, res, next) => {
  FamilyMember.findById(req.params.id)
    .then(handle404)
    .then(familyMember => {
      // throw an error if current user doesn't own `familyMember`
      requireOwnership(req, familyMember)
      // delete the familyMember ONLY IF the above didn't throw
      familyMember.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
