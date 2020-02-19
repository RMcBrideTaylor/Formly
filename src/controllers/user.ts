import { User } from "../models/user";
import express from "express";
const router = express.Router();


// Index
router.get('/', (req, res) => {
  res.json('made it to user')
})

export default router
