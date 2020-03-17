import express from 'express'
const router = express.Router()

import { User } from '../models/user'

// GET user information
router.get('/:userId', async (req, res) => {
  User.findOne({id: Number(req.params.userId) })
  .then( (user) => {

    // Remove hashed output from the return
    delete user.password

    res.json(user)
  } )
  .catch( (err) => {
    res.status(404).send('User not found')
  })

})

// UPDATE user information
router.post('/update/:userId', (req, res) => {
  const {
    userId
  } = req.params

  const {
    firstName,
    lastName,
    email
  } = req.body

  if(!firstName || !lastName || !email ) {
    res.status(400).send('All properties must be defined in update.')
  }

  User.findOne({ id: Number(req.params.userId) })
  .then( (user) => {

    user.firstName = firstName
    user.lastName = lastName
    user.email = email

    user.save()

    // Remove hashed output from the return
    delete user.password

    res.json(user)
  })
  .catch( (err) => {
    res.status(400).send('Could not update user.')
  })

})

// DELETE existing user
router.post('/delete/:userId', (req, res) => {
  const {
    userId
  } = req.params

  User.findOne({id: Number(userId) })
  .then( (user) => {

    user.remove()
    .then(() => {
      res.status(200).send('Success!')
    })
    .catch( err => {
      res.status(400).send(`Could not delete user ${ userId }`)
    })

  } )
  .catch( (err) => {
    res.status(404).send('User not found')
  })
})

export default router
