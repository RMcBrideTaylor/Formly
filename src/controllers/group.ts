import express from 'express'
const router = express.Router()

import { Group } from '../models/group'
import { User } from '../models/user'
import { Account } from '../models/account'


// Get a listing of all groups
router.get('/', (req, res) => {
  Group.find()
  .then( groups => {
    res.json(groups)
  })
  .catch( err => {
    res.status(400).send('Could not list groups.')
  })
})

// Get group information
router.get('/:id', async (req, res) => {

  Group.findOne({ id: Number(req.params.id) }, { relations: ['members'] })
  .then( group => {
    res.json(group)
  })
  .catch( err => {
    res.status(404).send('Group not found.')
  })

})

// Create new group
router.post('/create', async (req, res) => {
  const {
    name
  } = req.body

  const user : any = req.user
  const group = new Group()

  group.name = name
  group.members = [ user.account as Account ]

  await group.save()

  res.json(group)

})

// Add user to existing group
router.post('/:groupId/add/:userId', async ( req, res ) => {

  const {
    groupId,
    userId
  } = req.params

  const authUser : any = req.user

  Group.findOne({ id: Number(groupId) }, { relations: ['members']})
  .then(group => {

    checkGroupMembership( authUser.account as Account, group, allow => {
      if (!allow) { res.status(403).send(`Could not update group. Permission Denied.`) }

      // Find the user and add it to the members array
      User.findOne({ id: Number(userId) }, { relations: ['account'] })
      .then(user => {
        group.members.push(user.account)
        group.save()
        res.status(200).send('Success!')

      })
      .catch(err => {
        res.status(404).send(`User not found.`)
      })
    })


  })
  .catch(err => {
    res.status(404).send(`Group not found.`)
  })


})

// Remove user from existing group
router.post('/:groupId/remove/:userId', async ( req, res ) => {

  const {
    groupId,
    userId
  } = req.params

  const authUser : any = req.user

  Group.findOne({ id: Number(groupId) }, { relations: ['members']})
  .then(group => {

    checkGroupMembership( authUser.account as Account, group, allow => {
      if (!allow) { res.status(403).send(`Could not update group. Permission Denied.`) }

      // Find the user and remove it from the members array
      User.findOne({ id: Number(userId) }, { relations: ['account'] })
      .then(user => {

        group.members = group.members.filter((element, index) => {
          return element.id !== user.id
        })
        group.save()
        res.status(200).send('Success!')

      })
      .catch(err => {
        res.status(404).send(`User not found.`)
      })
    })


  })
  .catch(err => {
    res.status(404).send(`Group not found.`)
  })


})

// Update the properties of exisint group
router.post('/update/:groupId', async ( req, res ) => {

  const {
    groupId
  } = req.params

  const {
    name
  } = req.body

  const user : any = req.user

  Group.findOne({ id: Number(groupId) })
  .then( group => {

    checkGroupMembership(user.account as Account, group, allow => {
      if (!allow) { res.status(403).send(`Could not update group. Permission Denied.`) }

      group.name = name
      group.save()

      res.status(200).send('Success!')
    })

  })
  .catch( err => {
    res.status(400).send(`Could not update group with id ${ groupId }`)
  })

})

// Delete group of which you are a member
router.post('/delete/:groupId', async ( req, res ) => {

  const {
    groupId
  } = req.params

  const user : any = req.user

  Group.findOne({ id: Number(groupId) }, { relations: ['members'] })
  .then(group => {
    checkGroupMembership( user.account as Account, group, allow => {
      if (!allow) { res.status(403).send(`Could not delete group. Permission Denied.`) }

      group.remove()
      .then(() => {
        res.status(200).send('Success!')
      })
      .catch( err => {
        res.status(400).send(`Could not delete group with id ${ groupId }`)
      })

    })
  })
  .catch( err => {
    res.status(400).send(`Could not delete group with id ${ groupId }`)
  })
})

/*
* Helpers
*/

function checkGroupMembership( account : Account, group : Group, onComplete : (result : boolean) => void ) {

  if( group.members.some(a => a.id === account.id) ){
    onComplete(true)
  } else {
    onComplete(false)
  }

}

export default router
