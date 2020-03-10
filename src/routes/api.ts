import express from "express";
const router = express.Router();

// Controllers
import auth_controller from '../controllers/auth'
import user_controller from '../controllers/user'
// import form_controller from '../controllers/form'
// import submission_controller from '../controllers/submission'

// Auth routes
router.use('/auth', auth_controller)

// User Resource Routes
router.use('/user', user_controller)

// Form Resource Routes
// router.use('/form', form_controller)

// Submission Resource Routes
// router.use('/submission', submission_controller)




router.get('/', (req, res) => {
  res.json('home')
})

export default router
