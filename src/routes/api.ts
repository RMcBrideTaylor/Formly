import express from 'express'
const router = express.Router()

import passport from '../config/passport'

// Controllers
import auth_controller from '../controllers/auth'
import user_controller from '../controllers/user'
import group_controller from '../controllers/group'
// import form_controller from '../controllers/form'
// import submission_controller from '../controllers/submission'

// Auth routes
router.use('/auth', auth_controller)

// User Resource Routes
router.use('/user', passport.authenticate('token', { session: false }), user_controller)

// Group Resource Routes
router.use('/group', passport.authenticate('token', { session: false }), group_controller)

// Form Resource Routes
// router.use('/form', form_controller)

// Submission Resource Routes
// router.use('/submission', submission_controller)


export default router
