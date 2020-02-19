import { User } from "../models/user";
import express from "express";
import { body }  from 'express-validator';
import { sanitizeBody } from 'express-validator';
const router = express.Router();

// Index
router.get('/', (req, res, next) => {
  res.json('made it to auth')
})

// Login

// Register
router.post('/register', [

  // Validate and sanitize input
  body('username')
    .not().isEmpty(),
  body('email')
    .isEmail()
    .normalizeEmail(),
  body('password')
    .not().isEmpty()
    .trim()
    .escape(),
  body('verifyPassword')
    .not().isEmpty()

], (req, res) => {
  const { username, email, password, verifyPassword } = req.body

  const errors = validationResult(req);

  // Check that password and verification match
  if( password !== verifyPassword) {
    return res.status(422).json({errors: [

    ]})
  }

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const account = await Account.create();

  User.create({
    username: username,
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password

  })
  .then(() => {
    return res.status(200).json({ message: "success" })
  })
}
export default router
