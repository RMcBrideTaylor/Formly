import { User } from "../models/user"
import { Account } from "../models/account"
import { Cache } from "../models/cache"

import express from "express";
import {
  body,
  sanitizeBody,
  check,
  validationResult
}  from 'express-validator';
import passport from '../config/passport';
const router = express.Router();
import crypto from 'crypto';
import * as bcrypt from 'bcrypt';

// Login
router.post('/login', passport.authenticate('login', { session: false }), (req, res, next) => {

  // Generate token
  crypto.randomBytes(32, async (err, buffer) => {
    if (err) throw err

    const token = buffer.toString('hex')
    const date : Date = new Date(Date.now())
    const user : any = req.user
    date.setDate(date.getDate() + 1)

    // First or Create cache entry
    let cache = await Cache.findOne({ account: user.account, key: 'token' })
    if( !cache ) { cache = new Cache() }

    cache.key = 'token'
    cache.account = user.account
    cache.value = token
    cache.expires = date

    await cache.save()

    res.json({
      token
    })

  });


})

// Register
router.post('/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 7 }),
    body('verifyPassword').not().isEmpty()
  ],
async (req : any, res : any) => {

  const {
    username,
    email,
    firstName,
    lastName,
    password,
    verifyPassword
  } = req.body

  const errors = validationResult(req);

  // Check that password and verification match
  if( password !== verifyPassword) {
    return res.status(422).json({ errors: ['Password and verification must match'] });
  }

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const account = new Account()
  const user = new User()
  user.username = username
  user.email = email
  user.firstName = firstName
  user.lastName = lastName
  user.password = await bcrypt.hash(password, 10)
  user.account = account

  await account.save()
  await user.save()

  delete(user.password)

  return res.status(200).json(user)
})

export default router
